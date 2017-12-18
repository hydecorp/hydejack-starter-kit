---
# Posts need to have the `post` layout
layout: post

# The title of your post
title: Bind this keyword to a callback in ES6 / React

# (Optional) Write a short (~150 characters) description of each blog post.
# This description is used to preview the page on search engines, social media, etc.
description: >
  Bind this to a callback function in es6/react to call functions from class scope.

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
tags: [es6, react, javascript, development]
# If you want a category or tag to have its own page,
# check out `_featured_categories` and `_featured_tags` respectively.
---

I had the problem that I could not call `this.setState()` inside a callback function. This was related to the scope of this (it referenced to the function not the class). I either should use **es6 arrow function** or **bind this to the callback function**. ([>> StackOverflow](https://stackoverflow.com/a/31045750/1929968))