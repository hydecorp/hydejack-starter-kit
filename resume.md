---
layout: resume
title: Résumé*
description: >
  This is the `description` of your resume page, as it will be seen by search engines.
  You'll probably want to modify it in `resume.md`, and maybe set `hide_description` to `true` in the front matter.
hide_description: true
left_column:
  - work
  - volunteer
  - education
  - awards
  - publications
  - references
right_column:
  - languages
  - skills
  - interests
no_language_icons: false
no_skill_icons: false
buttons:
  print: true
  pdf: /assets/Resume.pdf
  # For the vCard you can either provide a link to a .vcf file in assets (see `pdf` above),
  # or use `h2vx.com` to generate a vCard on the fly based on the structured data of the resume page.
  # The later requires `hydejack.no_structured_data: false` and only works once the site is deployed to a public URL.
  vcf: http://h2vx.com/vcf/<!--url-->
  json: /assets/resume.json
---
