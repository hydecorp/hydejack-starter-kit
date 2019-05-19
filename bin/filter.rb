#!/usr/bin/env ruby

begin
  require 'nokogiri'
rescue LoadError
  puts "Run 'gem install nokogiri'"
  exit 1
end

def split_header(data)
  header, body = nil, nil
  if data =~ /\A\s*---/
    _, header, *rest = data.split('---')
    body = rest.join('---')
  else
    body = data
  end

  [header, body]
end

def process(data, force_header: nil, format_for_frontpage: false)
  header, body = split_header(data)

  doc = Nokogiri::HTML::DocumentFragment.parse(body)

  # Add 'highlight' class to tables because it bypasses our template's default formatting.
  doc.css("table").each do |node|
    node['class'] = (node['class'] || '') + ' highlight' unless (node['class'] || '') =~ /highlight/
  end

  # Set colors.
  doc.css("[style]").each do |node|
    node['style'] = node['style'].gsub(/#\w{6}/) { |m|
      case m
      when '#ffffff','#fafafa'
        'var(--body-bg)'
      when '#5f5f5f'
        'var(--gray-text)'
      when '#202020'
        'var(--body-color)'
      when '#2f767f'
        'var(--mc-link-color)'
      else
        m
      end
    }
  end

  # Links should open in a new tab.
  doc.css("a").each do |node|
    node['target'] = "_blank"
  end

  # Remove any footer and old subscribe regions.
  doc.css('#templateFooter, #subscribe-footer').each(&:remove)

  if format_for_frontpage
    # Remove the email header text, if any.
    doc.css('#templatePreheader').each(&:remove)

    # Rename the title
    doc.css('#templateHeader h1 span').each do |node|
      node.inner_html = "Latest Issue"
    end
  end

  if force_header || header
    '---' + (force_header || header) + '---' + doc.to_html
  else
    doc.to_html
  end
end

# Update the archive

greatest_issue_number, greatest_issue_file = -1, nil
files = Dir['archive/_posts/*.html']
files.each do |file|
  issue_number = file[/Issue-(\d+)/, 1].to_i
  puts "Processing #{file} (#{issue_number})"
  processed = process(File.read(file))
  File.open(file, 'w') do |file|
    file.print processed
  end

  if issue_number > greatest_issue_number
    greatest_issue_number = issue_number
    greatest_issue_file = file
  end
end

# Update the latest post on the frontpage
existing_header, _ = split_header(File.read('index.md'))
File.open('index.md', 'w') do |file|
  file.print process(File.read(greatest_issue_file), force_header: existing_header, format_for_frontpage: true)
end
