#!/usr/bin/env python3
"""
Archive Mailchimp images from newsletter issues.

This script:
1. Scans all HTML files in archive/_posts/ for Mailchimp image URLs
2. Downloads images to assets/archive-images/issue-XXX/
3. Resolves list-manage.com redirect URLs to final destinations
4. Updates the HTML files with local paths and resolved URLs
5. Logs any failures for manual review

Usage:
    python bin/archive_images.py [--dry-run] [--limit N] [--issue N]

Options:
    --dry-run   Don't download images or modify files, just report what would be done
    --limit N   Only process N images total (for testing)
    --issue N   Only process issue number N
"""

import argparse
import os
import re
import sys
import time
import hashlib
from pathlib import Path
from urllib.parse import urlparse, parse_qs, unquote
from concurrent.futures import ThreadPoolExecutor, as_completed

try:
    import requests
except ImportError:
    print("Error: requests library required. Install with: pip install requests")
    sys.exit(1)

# Project root directory
ROOT_DIR = Path(__file__).parent.parent
POSTS_DIR = ROOT_DIR / "archive" / "_posts"
IMAGES_DIR = ROOT_DIR / "assets" / "archive-images"

# Mailchimp URL patterns
MAILCHIMP_IMAGE_PATTERNS = [
    r'https://gallery\.mailchimp\.com/[^/]+/images/[a-f0-9-]+\.[a-z]+',
    r'https://mcusercontent\.com/[^/]+/images/[a-f0-9-]+\.[a-z]+',
]

MAILCHIMP_REDIRECT_PATTERN = r'https://[^"\']+\.list-manage\.com/track/click\?[^"\'\s>]+'

# Combine all image patterns
MAILCHIMP_IMAGE_REGEX = re.compile('|'.join(MAILCHIMP_IMAGE_PATTERNS), re.IGNORECASE)
MAILCHIMP_REDIRECT_REGEX = re.compile(MAILCHIMP_REDIRECT_PATTERN, re.IGNORECASE)

# Request settings
REQUEST_TIMEOUT = 30
MAX_RETRIES = 3
RETRY_DELAY = 2

# Results tracking
class Results:
    def __init__(self):
        self.images_found = 0
        self.images_downloaded = 0
        self.images_failed = []
        self.redirects_found = 0
        self.redirects_resolved = 0
        self.redirects_failed = []
        self.files_updated = 0


def get_issue_number(filename):
    """Extract issue number from filename like '2019-05-14-archive-Issue-12.html'"""
    match = re.search(r'Issue-(\d+)\.html$', filename, re.IGNORECASE)
    return int(match.group(1)) if match else None


def extract_image_uuid(url):
    """Extract the UUID and extension from a Mailchimp image URL."""
    # URLs look like: https://mcusercontent.com/.../images/UUID.ext
    match = re.search(r'/images/([a-f0-9-]+)\.([a-z]+)$', url, re.IGNORECASE)
    if match:
        return match.group(1), match.group(2)
    return None, None


def download_image(url, dest_path, dry_run=False):
    """Download an image from URL to destination path."""
    if dry_run:
        print(f"  [DRY RUN] Would download: {url}")
        return True, None

    dest_path.parent.mkdir(parents=True, exist_ok=True)

    if dest_path.exists():
        print(f"  [SKIP] Already exists: {dest_path.name}")
        return True, None

    for attempt in range(MAX_RETRIES):
        try:
            response = requests.get(url, timeout=REQUEST_TIMEOUT, allow_redirects=True)
            response.raise_for_status()

            with open(dest_path, 'wb') as f:
                f.write(response.content)

            print(f"  [OK] Downloaded: {dest_path.name} ({len(response.content)} bytes)")
            return True, None

        except requests.RequestException as e:
            if attempt < MAX_RETRIES - 1:
                time.sleep(RETRY_DELAY * (attempt + 1))
            else:
                error_msg = f"Failed to download {url}: {e}"
                print(f"  [FAIL] {error_msg}")
                return False, error_msg

    return False, "Max retries exceeded"


def resolve_redirect(url, dry_run=False):
    """Resolve a list-manage.com redirect URL to its final destination."""
    if dry_run:
        print(f"  [DRY RUN] Would resolve redirect: {url[:80]}...")
        return None, None

    for attempt in range(MAX_RETRIES):
        try:
            # Use HEAD request with redirects to find final URL
            response = requests.head(url, timeout=REQUEST_TIMEOUT, allow_redirects=True)
            final_url = response.url

            # If still on list-manage.com, try GET request
            if 'list-manage.com' in final_url:
                response = requests.get(url, timeout=REQUEST_TIMEOUT, allow_redirects=True)
                final_url = response.url

            # Check if we actually resolved to a different URL
            if final_url != url and 'list-manage.com' not in final_url:
                print(f"  [OK] Resolved redirect to: {final_url[:80]}...")
                return final_url, None
            else:
                error_msg = f"Could not resolve redirect (still at: {final_url[:50]}...)"
                print(f"  [WARN] {error_msg}")
                return None, error_msg

        except requests.RequestException as e:
            if attempt < MAX_RETRIES - 1:
                time.sleep(RETRY_DELAY * (attempt + 1))
            else:
                error_msg = f"Failed to resolve redirect {url[:50]}...: {e}"
                print(f"  [FAIL] {error_msg}")
                return None, error_msg

    return None, "Max retries exceeded"


def process_issue_file(file_path, results, dry_run=False, download_images=True):
    """Process a single issue file, extracting and downloading images."""
    issue_num = get_issue_number(file_path.name)
    if issue_num is None:
        print(f"Warning: Could not extract issue number from {file_path.name}")
        return None

    print(f"\nProcessing Issue {issue_num}: {file_path.name}")

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    issue_images_dir = IMAGES_DIR / f"issue-{issue_num}"

    # Find all Mailchimp image URLs
    image_urls = set(MAILCHIMP_IMAGE_REGEX.findall(content))
    results.images_found += len(image_urls)

    # Find all redirect URLs
    redirect_urls = set(MAILCHIMP_REDIRECT_REGEX.findall(content))
    results.redirects_found += len(redirect_urls)

    if image_urls:
        print(f"  Found {len(image_urls)} Mailchimp image(s)")
    if redirect_urls:
        print(f"  Found {len(redirect_urls)} redirect URL(s)")

    # Process images
    for url in image_urls:
        uuid, ext = extract_image_uuid(url)
        if not uuid:
            print(f"  [WARN] Could not extract UUID from: {url}")
            results.images_failed.append((issue_num, url, "Could not extract UUID"))
            continue

        local_filename = f"{uuid}.{ext}"
        local_path = issue_images_dir / local_filename
        relative_path = f"/assets/archive-images/issue-{issue_num}/{local_filename}"

        if download_images:
            success, error = download_image(url, local_path, dry_run)
            if success:
                results.images_downloaded += 1
                # Replace URL in content
                content = content.replace(url, relative_path)
            else:
                results.images_failed.append((issue_num, url, error))
        else:
            # Just update the URL without downloading
            content = content.replace(url, relative_path)

    # Process redirect URLs
    for url in redirect_urls:
        final_url, error = resolve_redirect(url, dry_run)
        if final_url:
            results.redirects_resolved += 1
            content = content.replace(url, final_url)
        else:
            results.redirects_failed.append((issue_num, url, error))

    # Write updated content if changed
    if content != original_content and not dry_run:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        results.files_updated += 1
        print(f"  [UPDATED] {file_path.name}")

    return {
        'issue': issue_num,
        'images': len(image_urls),
        'redirects': len(redirect_urls),
    }


def main():
    parser = argparse.ArgumentParser(description='Archive Mailchimp images from newsletter issues')
    parser.add_argument('--dry-run', action='store_true', help="Don't download or modify, just report")
    parser.add_argument('--limit', type=int, help="Limit total images to process (for testing)")
    parser.add_argument('--issue', type=int, help="Only process specific issue number")
    parser.add_argument('--no-download', action='store_true', help="Update URLs but skip downloading images")
    parser.add_argument('--report-only', action='store_true', help="Only report what would be processed")
    args = parser.parse_args()

    if not POSTS_DIR.exists():
        print(f"Error: Posts directory not found: {POSTS_DIR}")
        sys.exit(1)

    # Get all issue files
    issue_files = sorted(POSTS_DIR.glob("*.html"))
    print(f"Found {len(issue_files)} issue files")

    # Filter by issue number if specified
    if args.issue:
        issue_files = [f for f in issue_files if get_issue_number(f.name) == args.issue]
        if not issue_files:
            print(f"Error: Issue {args.issue} not found")
            sys.exit(1)
        print(f"Processing only Issue {args.issue}")

    results = Results()

    if args.report_only:
        # Quick scan to report totals
        all_images = set()
        all_redirects = set()
        for file_path in issue_files:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            all_images.update(MAILCHIMP_IMAGE_REGEX.findall(content))
            all_redirects.update(MAILCHIMP_REDIRECT_REGEX.findall(content))

        print(f"\n=== Report ===")
        print(f"Total unique Mailchimp images: {len(all_images)}")
        print(f"Total unique redirect URLs: {len(all_redirects)}")
        print(f"Issues to process: {len(issue_files)}")
        return

    # Process each file
    images_processed = 0
    for file_path in issue_files:
        if args.limit and images_processed >= args.limit:
            print(f"\nReached limit of {args.limit} images")
            break

        process_issue_file(
            file_path,
            results,
            dry_run=args.dry_run,
            download_images=not args.no_download
        )

        images_processed = results.images_downloaded + len(results.images_failed)

    # Print summary
    print(f"\n{'='*50}")
    print("SUMMARY")
    print(f"{'='*50}")
    print(f"Images found: {results.images_found}")
    print(f"Images downloaded: {results.images_downloaded}")
    print(f"Images failed: {len(results.images_failed)}")
    print(f"Redirects found: {results.redirects_found}")
    print(f"Redirects resolved: {results.redirects_resolved}")
    print(f"Redirects failed: {len(results.redirects_failed)}")
    print(f"Files updated: {results.files_updated}")

    # Write failure report if any
    if results.images_failed or results.redirects_failed:
        report_path = ROOT_DIR / "archive-failures.txt"
        with open(report_path, 'w') as f:
            f.write("# Archive Image Failures Report\n")
            f.write(f"# Generated: {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")

            if results.images_failed:
                f.write("## Failed Images\n")
                for issue, url, error in results.images_failed:
                    f.write(f"Issue {issue}: {url}\n  Error: {error}\n\n")

            if results.redirects_failed:
                f.write("## Failed Redirects\n")
                for issue, url, error in results.redirects_failed:
                    f.write(f"Issue {issue}: {url}\n  Error: {error}\n\n")

        print(f"\nFailure report written to: {report_path}")


if __name__ == '__main__':
    main()
