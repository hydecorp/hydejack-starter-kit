---
layout: post
title: Hydejack, Stripe-ified
image: 
  path: /assets/img/blog/nick-wright-Cp19i8IOjk4-unsplash.jpg
  srcset: 
    1920w: /assets/img/blog/nick-wright-Cp19i8IOjk4-unsplash.jpg
    960w:  /assets/img/blog/nick-wright-Cp19i8IOjk4-unsplash@0,5x.jpg
    480w:  /assets/img/blog/nick-wright-Cp19i8IOjk4-unsplash@0,25x.jpg
description: >
  Hydejack is back from the dead with a few long overdue bugfixes. 
redirect_from:
  /blog/hydejack/2024-09-04-service-release-9-1-7/
excerpt_separator: <!--more-->
---

# Service Release For 9.1

A full-time job and focus to my many other side projects meant that Hydejack has been effectively abandoned for the last couple of years. 

Recently I've used Hydejack myself to blog on my personal site, and while it may sound silly, __I came away impressed with my own product__.

<!--more-->

When I was actively working on Hydejack, all I could see were its flaws, but looking at it with fresh eyes, it struck me as  a pretty good product and in many ways ahead of its time: 
Just recently the [View Transitions API][vta] has landed in major browsers, enabling the kinds of animations that have been the bread and butter of Hydejack for years (back then painstakingly hand-coded using JavaScript).

While I can't go back to working full-time on this project --- the economics of a niche one-time purchase like this hard to justify --- I'm going to dedicate 1-2 weeks to brushing it up, starting with __a service release that removes the annoying deprecation warnings__ that you've likely encountered:

![Deprecation Warnings](/assets/img/blog/deprecation-warnings.png){:.border}

With that out of the way, another thing I want to improve is the documentation for deployments. Things have changed since I wrote the original docs. There are now much better ways of deploying to GitHub Pages and from GitHub Actions in general. 

The deployment experience for PRO customers could also be improved. Upgrading from Free to PRO hasn't been as smooth as it could be due to the need to manually manage source files. Instead, it would be possible to create a GitHub Organization for all customers which would allow pulling PRO code directly from a private repository in most CI pipelines.

Privacy has become a big focus in recent years, which means enabling Google Analytics and Google Fonts by default can no longer be considered good taste for a ownership focused web presence. 
The default newsletter provider Tinyletter has folded since the last release and needs a replacement. 
These things could be remedied in a future release.

If there's time left, I will also look into deleting 100s of lines of custom JS code in favor of the View Transitions API.
Let's see how things go.


[vta]: https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
