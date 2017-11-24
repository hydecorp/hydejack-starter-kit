---
# Posts need to have the `post` layout
layout: post

# The title of your post
title: Find the resources that are intersting to bootstrap your ecosystem

# (Optional) Write a short (~150 characters) description of each blog post.
# This description is used to preview the page on search engines, social media, etc.
description: >
  There are 3 types of customer journey groups in an ecosystem - these journeys have
  different resources that need to be exposed by APIs.  

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
categories: [tech]
tags: [api, ecosystem, design]
# If you want a category or tag to have its own page,
# check out `_featured_categories` and `_featured_tags` respectively.
---

When you start your ecosystem you need to decide which type of relationship you want to build up in the first place: 

* **Products**: This is the traditional multi level marketing / broker concept transfert to the digital age. Other 
have the possibility to sell your product or service this requires apis like: 

*Customer Journey*: 
Customer browsers the services (might test it) -> The customers "sign up" (his data is first hold at the 3rd party app but we could offer a service to do even the customer manamgement for him) or at least gives one time the relevant data eg name, adress, contact data, payment data -> subscribes to service -> use the service -> manages the subscription (renew/cancel)

Resource | Function  | GET | POST | UPDATE | DELETE | Example APIs
---|---|---|---|---|---|---
`/products` | This offers a production catalog some body can use to display and sell the products | x |||| [Zalando Shop API](https://api.zalando.com/swagger/index.html)
`/recomendations` | This api takes some relevant paramters about the situation and the customer and displace the right products for this customer (does it even make sense to offer a simple product api?) | x | | | | ?
`/customers` | This manages the customer from the lead stage (when he browsed to the site anonymous an id and meta data is allready recorded) | x | x | x | | ?  

* **Customers**:

* **Functions/Capabilities**: