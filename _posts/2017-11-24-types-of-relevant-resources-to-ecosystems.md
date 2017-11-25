---
# Posts need to have the `post` layout
layout: post

# The title of your post
title: Find the resources that are intersting to bootstrap your ecosystem [In Progress]

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

<img src='https://g.gravizo.com/svg?
@startuml;
actor Customer as c ;
participant "Service Interface\n yours or 3rd party" as si;
database CustomerDB as cdb;
participant "API" as a;
c -> si: browse and tests;
si --> cdb: collect data;
c -> si: "signs up" ;
si -> cdb: saves the customer data %28contact & contract details e.g. subscription%29;
note left of cdb: eg name, adress, contact data, payment data ;
note right of cdb: we could offer a service manage the \ncustomer data %28multi tenancy & saas%29;
c -> si: subscribe to service;
si -> a: manages `/products` and `/customers`;
c -> si: use service;
si -> a: serve the `/products` throw interface;
c -> si: manages the subscription %28renew/cancel%29;
si -> a: /products & /customers;
@enduml
'>

Resource | Function  | GET | POST | UPDATE | DELETE | Example APIs
---|---|---|---|---|---|---
`/products` | This offers a production catalog some body can use to display and sell the products | x |||| [Zalando Shop API](https://api.zalando.com/swagger/index.html), [FinAPI](https://www.microsoft.com/de-de/store/p/quicklook/9nv4bs3l1h4s)
`/recomendations` | This api takes some relevant paramters about the situation and the customer and displace the right products for this customer (does it even make sense to offer a simple product api?) | x | | | | ?
`/customers` | This manages the customer from the lead stage (when he browsed to the site anonymous an id and meta data is allready recorded) | x | x | x | | ?  

* **Customers**:

* **Functions/Capabilities**: