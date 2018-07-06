---
title: Bind this keyword to a callback in ES6 / React
author: Den
authorURL: http://twitter.com/denseidel
authorFBID: 1440692838
---

I had the problem that I could not call `this.setState()` inside a callback function. This was related to the scope of this (it referenced to the function not the class). I either should use **es6 arrow function** or **bind this to the callback function**. ([>> StackOverflow](https://stackoverflow.com/a/31045750/1929968))