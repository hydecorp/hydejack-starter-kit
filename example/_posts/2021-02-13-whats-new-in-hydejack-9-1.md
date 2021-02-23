---
layout: post
title: Hydejack, Stripe-ified
image: /assets/img/blog/jj-ying.jpg
accent_image: 
  background: url('/assets/img/blog/jj-ying.jpg') center/cover
  overlay: false
accent_color: '#ccc'
theme_color: '#ccc'
description: >
  Version 9.1 provides minor design changes, new features, and closes multiple issues.
invert_sidebar: true
---

# What's New in Hydejack 9.1?

What's New in Hydejack 9.1?

* toc
{:toc}


## Stripe-ified Design
Most elements now have rounded borders, making the design look more modern (dare I say "Stripe-ified") than ever before. 

The goal of Hydejack was always to provide a theme that looks "designed" combined the amenities of a typical Jekyll theme for coders.
This is an important step in maintaining this goal.

At the same time, I'm introducing nerdy elements like [breadcrumbs](#serp-breadcrumbs), that are almost ornamental in nature.
You wouldn't find these on other Stripe-like designs, but I think they are appealing to developer types like myself. 
Like most additions to Hydejack, they can be disabled via configuration. 


## Inverted Sidebars
The colors on the sidebar can now be inverted to allow brighter sidebar images. This can be enabled per-page in the fort matter:

```yml
invert_sidebar: true
```


## Code Block Headers
Code blocks can now have headers:

~~~js
// file: 'hello-world.js'
console.log('Hello World!');
~~~

Headers are added by making the first line a comment of the form `(file|title): ['"].*['"]`, e.g.:

    ~~~js
    // file: 'hello-world.js'
    console.log('Hello World!');
    ~~~
    
Code blocks with and without headers now also come with a copy button. 
In the case of header-less code blocks, the button only shows on hover to prevent potential overlap.


## Resume Download Buttons
Resumes can now have download buttons:

![Download Buttons](/assets/img/blog/9.1.0-3.png){:.border.lead width="1776" height="258" loading="lazy"}

Resumes can now have download buttons.
{:.figcaption}

The documentation has been updated with a chapter on [how to configure the buttons](/docs/basics/#downloads).


## SERP Breadcrumbs
Added breadcrumbs above page title:

![Breadcrumbs](/assets/img/blog/9.1.0-2.png){:.border.lead width="1588" height="164" loading="lazy"}

Bread crumbs are now shown above each page title.
{:.figcaption}

Note that this requires a [directory-like URL structure](https://qwtel.com/posts/software/urls-are-directories/) on your entire site, 
otherwise the intermediate links will point to nonexisting sites.

On a side note, Hydejack now has built-in tooltips for abbreviations like SERP (activated via tap/click).
See [Example Content](/blog/hyde/2012-02-07-example-content/#inline-html-elements) on how to add them to your content.


## Last Modified At
Blog posts can now have a "last modified at" date in the sub title row.

![Last modified at](/assets/img/blog/9.1.0-1.png){:.border.lead width="1254" height="218" loading="lazy"}

Note that this depends on the `last_modified_at` property of the page, which must be either set manually in the frontmatter (not recommended), or via a plugin like [`jekyll-last-modified-at`](https://github.com/gjtorikian/jekyll-last-modified-at). Note that the later is not available when building on GitHub Pages and can increase build times.


## Clap Button Preview
I've been trying something new with [**getclaps.app**](https://getclaps.app/), a feedback and analytics tool for personal sites like those powered by Hydejack. 
It looks like this:

<clap-button style="--clap-button-color:var(--body-color);margin:2rem auto 3rem;width:3rem;height:3rem;font-size:smaller" nowave></clap-button>

It is a separate product from Hydejack and not enabled by default. Because it depends on a backend component, it requires a monthly fee. 
If enabled, it is placed below posts and pages where the dingbat character (❖) used to be.

I can't claim that this product is fully baked (feedback welcome), but I've been using it on my personal site and here for the last couple of months with no issues.
For more, see [the dedicated website](https://getclaps.app/).

***
{:style="margin:2rem 0"}

There are many more changes and bugfixes in 9.1. See the [CHANGELOG](/changelog/){:.heading.flip-title} for details.


## Credits

<span>Photo by <a href="https://unsplash.com/@jjying?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">JJ Ying</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

*[SERP]: Search Engine Results Page
