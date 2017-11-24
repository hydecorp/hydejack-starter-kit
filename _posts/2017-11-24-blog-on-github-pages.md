---
# Posts need to have the `post` layout
layout: post

# The title of your post
title: Setup a Blog on Github Pages

# (Optional) Write a short (~150 characters) description of each blog post.
# This description is used to preview the page on search engines, social media, etc.
description: >
  Setting up a blog on github pages because of simplicity and code is a first class citizen. 

# (Optional) Link to an image that represents your blog post.
# The aspect ratio should be ~16:9.
image: /assets/img/default.jpg

# You can hide the description and/or image from the output
# (only visible to search engines) by setting:
hide_description: true
hide_image: true

# (Optional) Each post can have zero or more categories, and zero or more tags.
# The difference is that categories will be part of the URL, while tags will not.
# E.g. the URL of this post is <site.baseurl>/hydejack/2017/11/23/example-content/
categories: [tech]
tags: [github pages, markdown, blogging]
# If you want a category or tag to have its own page,
# check out `_featured_categories` and `_featured_tags` respectively.
---

**TL;DR:** I experiement with setting up my blog on github pages because of simplicity and code is a first class citizen. 


## Why use github pages for your blog? 

It is simple, it is markdown, it is versioned and it has first class support for code which is great if you use it as a knowledge base for things you do. 

## How to set it up 

Just follow the instructions at https://github.com/barryclark/jekyll-now#quick-start. 

Next you can update your site name, avatar and other options using the _config.yml file in the root of your repository (shown below).

![_config.yml]({{ site.baseurl }}/images/config.png)

The easiest way to make your first post is to edit this one. Go into /_posts/ and update the Hello World markdown file. For more instructions head over to the [Jekyll Now repository](https://github.com/barryclark/jekyll-now) on GitHub.
