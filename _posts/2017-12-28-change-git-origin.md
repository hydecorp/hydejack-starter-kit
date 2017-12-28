---
# Posts need to have the `post` layout
layout: post

# The title of your post
title: Change git origin 

# (Optional) Write a short (~150 characters) description of each blog post.
# This description is used to preview the page on search engines, social media, etc.
description: >
  Change the git origins to update the repository location.

# (Optional) Link to an image that represents your blog post.
# The aspect ratio should be ~16:9.
image: /assets/img/default.jpg

# You can hide the description and/or image from the output
# (only visible to search engines) by setting:
hide_description: false
hide_image: true

# (Optional) Each post can have zero or more categories, and zero or more tags.
# The difference is that categories will be part of the URL, while tags will not.
# E.g. the URL of this post is <site.baseurl>/hydejack/2017/11/23/example-content/
categories: [overflow]
tags: [git, development]
# If you want a category or tag to have its own page,
# check out `_featured_categories` and `_featured_tags` respectively.
---

After I delete a repository and create a new one I want to change the repository saved under origin in my local repo to the new repository location: 

`git remote set-url origin https://newurl.com`

([>> Github](https://help.github.com/articles/changing-a-remote-s-url/))