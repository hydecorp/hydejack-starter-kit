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
  - title: Link
    url: https://lazyren.github.io/
accent_image: https://lazyren.github.io/assets/img/sidebar-bg.jpg
theme_color: rgb(25,55,71)
---

DaeIn Lee took customization to the next level.
There's hardly a spot he didn't touch. 
He used a ton of Hydejack's customization options, and then wrote his own HTML and CSS on top.

When I asked him about his experience, he had the following to say:

> I guess the most significant change I've made was drop down menu on the sidebar.
> I'm not 100% familiar with web development, so I had to overcome some bumps, but overall it was manageable ---
> Especially with `my-style.scss` & `_variables.yml` you provided for customizing.

<script type="module">
  const classes = document.body.classList.toString();
  document.body.classList.add('dark-mode');
  document.querySelector('hy-push-state').addEventListener('after', () => setTimeout(() => document.body.setAttribute('class', classes), 700), { once: true });
</script>