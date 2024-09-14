---
layout: page
title: Upgrade
description: >
  This chapter shows how to upgrade Hydejack to a newer version. The method depends on how you've installed Hydejack.
hide_description: true
sitemap: false
---

This chapter shows how to upgrade Hydejack to a newer version. The method depends on how you've installed Hydejack.

0. this unordered seed list will be replaced by toc as unordered list
{:toc}

Before upgrading to v7+, make sure you've read the [CHANGELOG](../CHANGELOG.md){:.heading.flip-title},
especially the part about the [license change](../CHANGELOG.md#license-change)!
{:.note}

## Free version
Upgrading the free version of the theme is as easy as running

```bash
bundle update jekyll-theme-hydejack
```

## PRO Version

In v9, the structure of Hydejack PRO sites has changed. If you're looking to upgrade from v8 or earlier, 
check out [Installation for existing sites](./install.md#existing-sites) instead.
{:.note}

Buyers of the PRO version will find the files necessary for an upgrade in the `#jekyll-theme-hydejack` folder of the downloaded zip archive.
To upgrade, simply overwrite the existing theme folder in the root directory of your site with the new one, then run

```bash
bundle update jekyll-theme-hydejack
```

If you've modified any of Hydejack's files in `#jekyll-theme-hydejack`, your changes will most likely be overwritten
and you have to apply them again. Make sure you've made a backup before overwriting any files.
{:.note title="Important"}

If you've followed the steps to add __Hydejack PRO__ as a git dependency, all you have to do is change the `tag` to the latest version:

~~~ruby
# file: `Gemfile`
gem "jekyll-theme-hydejack", git: "https://github.com/hydecorp/hydejack-pro", tag: "pro/v9.2.1"
~~~

Note that you can also define a git dependency based on a branch, which removes the need for manual updates:

~~~ruby
# file: `Gemfile`
gem "jekyll-theme-hydejack", git: "https://github.com/hydecorp/hydejack-pro", branch: "pro/v9"
~~~

## GitHub Pages
When building on GitHub Pages, upgrading Hydejack is as simple as setting the `remote_theme` key in `_config.yml` to the desired version.

```yml
remote_theme: hydecorp/hydejack@v9.2.1
```

To use the latest version on the `v9` branch on each build, you can use  `hydecorp/hydejack@v9`.

This setting only works with the Free Version of Hydejack. 
**PRO Customers** must carefully merge contents of the `starter-kit-gh-pages` folder in the downloaded zip with their existing files. See [Deploy](./deploy.md){:.heading.flip-title} for a better way to use GitHub Pages, which also works with the PRO version.
{:.note}


Continue with [Config](config.md){:.heading.flip-title}
{:.read-more}
