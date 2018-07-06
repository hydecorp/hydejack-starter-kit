---
title: Create a REST API with Spring Boot [In Progress] 
author: Den
authorURL: http://twitter.com/denseidel
authorFBID: 1440692838
---
**TL;DR:** I getting started with Spring Boot by building a REST API and look into the RESTful Principles. 

<!--truncate-->
# What is REST?
REST stands for REpresentational State Transfer. REST specifies a set of architectural constraints. Any service which satisfies these constraints is called RESTful Service.

**The five important constraints for RESTful Web Service are** 

* Client - Server : There should be a service producer and a service consumer.
* The interface (URL) is uniform and exposing resources.
* The service is stateless.
* The service results should be Cacheable. HTTP cache, for example.
* Service should assume a Layered architecture. Client should not assume direct connection to server - it might be getting info from a middle layer - cache.

# Richardson Maturity Model
Richardson Maturity Model is used to identify the maturity level of a Restful Web Service. Following are the different levels and their characteristics:

* Level 0 : Expose SOAP web services in REST style. Expose action based services (http://server/getPosts, http://server/deletePosts, http://server/doThis, http://server/doThat etc) using REST.
* Level 1 : Expose Resources with proper URI’s (using nouns). Ex: http://server/accounts, http://server/accounts/10. However, HTTP Methods are not used.
* Level 2 : Resources use proper URI’s + HTTP Methods. For example, to update an account, you do a PUT to . The create an account, you do a POST to . Uri’s look like posts/1/comments/5 and accounts/1/friends/1.
* Level 3 : HATEOAS (Hypermedia as the engine of application state). You will tell not only about the information being requested but also about the next possible actions that the service consumer can do. When requesting information about a facebook user, a REST service can return user details along with information about how to get his recent posts, how to get his recent comments and how to retrieve his friend’s list.

I never seen Level 3 Maturity work in reality, so normal I only us it for paginage this accords with the experiences
by [Zalando](http://zalando.github.io/restful-api-guidelines/#163): 

> HATEOAS comes with **additional API complexity without real value** in our **SOA context where client and server interact via REST APIs and provide complex business functions** as part of our e-commerce SaaS platform.
> We follow the API First principle with APIs explicitly defined outside the code with standard specification language. ... a client engineer finds necessary links and usage description (depending on resource state) in the API reference definition anyway. 
> Generic HATEOAS clients which need no prior knowledge about APIs and explore API capabilities based on hypermedia information provided, is a theoretical concept that we haven’t seen working in practise and does not fit to our SOA set-up. The OpenAPI description format (and tooling based on OpenAPI) doesn’t provide sufficient support for HATEOAS either. 
> In practice relevant HATEOAS approximations (e.g. following specifications like HAL or JSON API) support API navigation by abstracting from URL endpoint and HTTP method aspects via link types. So, Hypermedia does not prevent clients from required manual changes when domain model changes over time. 
> Hypermedia does not prevent API clients to implement shortcuts and directly target resources without 'discovering' them.

# Using appropriate Request Methods
Always use HTTP Methods. Best practices with respect to each HTTP method is described below:

**GET** : Should not update anything. Should be idempotent (same result in multiple calls). Possible Return Codes 200 (OK) + 404 (NOT FOUND) +400 (BAD REQUEST)
**POST** : Should create new resource. Ideally return JSON with link to newly created resource. Same return codes as get possible. In addition : Return code 201 (CREATED) is possible.
**PUT** : Update a known resource. ex: update client details. Possible Return Codes : 200(OK)
**DELETE** : Used to delete a resource.

# Bootstrapping REST Services with Spring Initializr

Go to http://start.spring.io/ and create the following: 

Sidenote: [Maven Naming Conventions](https://maven.apache.org/guides/mini/guide-naming-conventions.html)

* Group: de.dennisseidel.services
* Artifact: parties
* Dependencies: Web, Actuator, DevTools 

;TODO: Add a description what the dependencies do

Select the Spring Boot Version (2017/11: 2.0.0M6), your build tool (Maven) and your language (Java) and click `Generate Project`. Download the result and extract it and open it with your IDE. 

# Model the buisness objects

create the folder `model` and a `Parties.java`

```java
package de.dennisseidel.services.parties.model;

import com.sun.org.apache.xpath.internal.operations.Bool;

import java.util.List;

public class Parties {
    private String customerNumber;
    private Boolean privacyFlag;
    private String currency;
    private List<String> loyalityPrograms;
    private String preferredLanguage;
    //TODO externalSystemReferences
    private List<String> addresses;
    private List<String> thirdPartyPolicies;
}
```


