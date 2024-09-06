---
layout: project
title: DaeIn Lee
caption: DaeIn Lee took customization to the next level
description: >
  DaeIn Lee took customization to the next level.
  There's hardly a spot he didn't touch.
image: 
  path: /assets/img/projects/lazyren.jpg
  srcset:
    1920w: /assets/img/projects/lazyren.jpg
    960w:  /assets/img/projects/lazyren@0,5x.jpg
    480w:  /assets/img/projects/lazyren@0,25x.jpg
date: 14 Jul 2020
links:
  - title: Site
    url: https://lazyren.github.io/
  - title: Blog Post
    url: https://lazyren.github.io/devlog/how-i-customized-hydejack-theme.html
accent_image: 
  background: url('https://lazyren.github.io/assets/img/doguri.jpg') center/cover
  overlay: false
accent_color: rgb(0,174,239)
---

DaeIn took customization to the next level.
He used a ton of Hydejack's customization options, and then wrote his own HTML and CSS on top.

He wrote about [how to customize Hydejack](https://lazyren.github.io/devlog/how-i-customized-hydejack-theme.html) in his devlog,
where you can also find other Jekyll-related topics. [Go check it out!](https://lazyren.github.io/devlog/)

If you intend to use Hydejack with Korean, you can [see what it looks like](https://lazyren.github.io/review/various-keyboard-layouts.html) on his site as well.

<script type="module">
  const classes = document.body.classList.toString();
  document.body.classList.add('dark-mode');
  document.querySelector('hy-push-state').addEventListener('after', () => setTimeout(() => document.body.setAttribute('class', classes), 700), { once: true });
</script>