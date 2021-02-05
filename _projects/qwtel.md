---
layout: project
title: '@qwtel'
caption: How I use Hydejack on my personal site.
description: >
  This is how I use Hydejack on my personal site. 
  Much of the development is informed from my experience of using it myself, creating a tight feedback loop.
date: 1 Jun 2020
image: 
  path: /assets/img/projects/qwtel.jpg
  srcset: 
    1920w: /assets/img/projects/qwtel.jpg
    960w:  /assets/img/projects/qwtel@0,5x.jpg
    480w:  /assets/img/projects/qwtel@0,25x.jpg
links:
  - title: Link
    url: https://qwtel.com/
accent_color: '#4fb1ba'
accent_image:
  background: '#193747'
theme_color: '#193747'
sitemap: false
---

For my personal site I've toned it down a bit. Instead of a flashy sidebar image, I chose a solid background color.
However, I've given [certain](https://qwtel.com/projects/ducky-hunting/) [pages](https://qwtel.com/projects/blocky-blocks/) big sidebar images, and let Hydejack blend back to normal when the user navigates away.

While I love the font used for Hydejack's headings, for my personal site I felt less of a need to control the typesetting.
That's why I'm not using Google Fonts, and instead use whatever is the default for the reader's operating system.

```yml
google_fonts: false
font:         false
font_heading: false
font_code:    false
```

The configuration I use to enable the system font on my site. Feel free to copy!
{:.figcaption}
