# TraCalorie Project

This project it's actually part of the [udemy course (modern JS)](https://www.udemy.com/course/modern-javascript-from-the-beginning/) by [Brad Traversy](https://www.traversymedia.com/), that's a great course.

## What I learned

Previous lecture on the course was about **Design Patterns** and this project implemented the *__Module Pattern__* where you can specify variables and functions to be private or public. Each module should focus in certain functionalities of the app and it's a common pattern inside JS.

* __Note:__  There is another pattern that is similar called _Revealing Pattern_

#### Here's an example

```javascript

  // This is a module
  const UIController = (function() {
    // Declare here the public vars and functions for the module
    let someVariable = 0;
    let anotherVar = null;

    function publicFunction() {
      console.log('Hello World');
    }

    function privateFunction(a, b) {
      return a * b;
    }

    // At the very end we should put what we want to be public as a returned obj
    return {
      myPublicVar : anotherVar,
      myPublicFunction : publicFunction()
    }
  })();
  // Recall that UIController is an IIFE

```

> "Discovering the unexpected is more important than confirming the known." _George Box_