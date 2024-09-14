---
layout: page
title: Install
description: >
  How you install Hydejack depends on whether you start a new site,
  or change the theme of an existing site.
hide_description: true
sitemap: false
---

How you install Hydejack depends on whether you [start a new site](#new-sites), 
or change the theme of [an existing site](#existing-sites).

0. this unordered seed list will be replaced by toc as unordered list
{:toc}

## New sites
For new sites, the best way to get started with Hydejack is via the Starter Kit. 
It comes with a documented config file and example content that gets you started quickly.

If you have a GitHub account, fork the [Hydejack Starter Kit][hsc] repository. 
Otherwise [download the Starter Kit][src] and unzip the contents somewhere on your machine.

If you bought the __PRO Version__ of Hydejack, use the contents of the `starter-kit` folder instead.

You can now jump to [running locally](#running-locally).

[hsc]: https://github.com/hydecorp/hydejack-starter-kit
[src]: https://github.com/hydecorp/hydejack-starter-kit/archive/v9.2.1.zip
[nfy]: https://app.netlify.com/start/deploy?repository=https://github.com/hydecorp/hydejack-starter-kit
[dtn]: https://www.netlify.com/img/deploy/button.svg


## Existing sites
If you have an existing site that you'd like to upgrade to Hydejack you can install the theme via bundler.
Add the following to your `Gemfile`:

~~~ruby
# file: `Gemfile`
gem "jekyll-theme-hydejack"
~~~

Next, in your config file, change the `theme` to Hydejack:

~~~yml
# file: `_config.yml`
theme: jekyll-theme-hydejack
~~~

You can now jump to [running locally](#running-locally).

### PRO Customers
If you bought the __PRO Version__ of Hydejack, copy the `#jekyll-theme-hydejack` folder into the root folder of your site,
and add the following to your `Gemfile` instead:

~~~ruby
# file: `Gemfile`
gem "jekyll-theme-hydejack", path: "./#jekyll-theme-hydejack"
~~~

The folder is prefixed with a `#` to indicate that this folder is different from regular Jekyll content. 
The `#` character was chosen because it is on of the four characters ignored by Jekyll by default (`.`, `_` , `#`, `~`)
{:.note}

Alternatively, if you've been added to the ["PRO Customers" team](https://github.com/orgs/hydecorp/teams/pro-customers) on GitHub, you can add __Hydejack PRO__ as a git dependency instead:

~~~ruby
# file: `Gemfile`
gem "jekyll-theme-hydejack", git: "https://github.com/hydecorp/hydejack-pro", tag: "pro/v9.2.1"
~~~

If you've provided your GitHub username during checkout you should have been automatically added to the team. Otherwise you can request an invite via [mail@hydejack.com](mailto:mail@hydejack.com).
{:.note}

In order for Bundle to fetch the private repository, an __environment variable__ named __`BUNDLE_GITHUB__COM`__ must be set to __`x-access-token:<GH_REPO_PAT>`__, where you replace `<GH_REPO_PAT>` with a GitHub [Personal Access Token](https://github.com/settings/tokens) (PAT) that has the "repo" permission.

After you've secured a way to fetch the `jekyll-theme-hydejack` gem, in your config file, change the `theme` to Hydejack:

~~~yml
# file: `_config.yml`
theme: jekyll-theme-hydejack
~~~

Hydejack comes with a default configuration file that takes care most of the configuration,
but it pays off to check out the [annotated example config file][config] from the Starter Kit to see what's available. See chapter [Config](./config.md){:.heading.flip-title} for more.
{:.note}

You can now jump to [running locally](#running-locally).

### Troubleshooting
If your existing site combines theme files with your content (as did previous versions of Hydejack/PRO),
make sure to delete the following folders:

- `_layouts`
- `_includes` 
- `_sass` 
- `assets`

The `assets` folder most likely includes theme files as well as your personal/content files. 
Make sure to only delete files that belong to the old theme!


## GitHub Pages
As of September 2024, the recommended way of deploying to GitHub Pages is through a custom [GitHub Action][gha], which gives you full control over the build process. 
No extra steps are required when using a GH Action and you can jump to [running locally](#running-locally), or learn more in chapter [Deploy](./deploy.md){:.heading.flip-title}.
That being said, Hydejack maintains backwards compatibility with the legacy pipeline and you can continue to use it.
{:.note}

If you want to build your site using the legacy pipeline, you can build off of the [`gh-pages` branch][gpb] in the Hydejack Starter Kit repo.

[ghp]: https://jekyllrb.com/docs/github-pages/
[gpb]: https://github.com/hydecorp/hydejack-starter-kit/tree/gh-pages
[gha]: https://docs.github.com/en/actions

The main difference to the regular starter kit is the use of `remote_theme` setting in the config file. 

```yml
# file: `_config.yml`
remote_theme: hydecorp/hydejack@v9.2.1
```

This setting only works with the Free Version of Hydejack. 
**PRO Customers** should use the `starter-kit-gh-pages` folder in the downloaded zip file when targeting the GitHub Pages legacy pipeline.
{:.note}

`starter-kit-gh-pages` is only required when deploying to GitHub Pages through the legacy build pipeline.
When using [a custom GitHub Action](./deploy.md#github-actions), the regular `starter-kit` provides a cleaner, less cluttered folder structure.
{:.note}

Make sure the `plugins` list contains `jekyll-include-cache` (create if it doesn't exist):

```yml
# file: `_config.yml`
plugins:
  - jekyll-include-cache
```

To run this configuration locally, make sure the following is part of your `Gemfile`:

```ruby
# file: `Gemfile`
gem "github-pages", group: :jekyll_plugins
```

Note that Hydejack has a reduced feature set when built on GitHub Pages. 
Specifically, using KaTeX math formulas doesn't work when built in this way.
{:.note}


## Running locally
Make sure you've `cd`ed into the directory where `_config.yml` is located.
Before running for the first time, dependencies need to be fetched from [RubyGems](https://rubygems.org/):

~~~bash
$ bundle install
~~~

If you are missing the `bundle` command, you can install Bundler by running `gem install bundler`.
{:.note}

Now you can run Jekyll on your local machine:

~~~bash
$ bundle exec jekyll serve
~~~

and point your browser to <http://localhost:4000> to see Hydejack in action.


Continue with [Config](config.md){:.heading.flip-title}
{:.read-more}

[config]: https://github.com/hydecorp/hydejack-starter-kit/blob/v9/_config.yml
[upgrade]: upgrade.md
