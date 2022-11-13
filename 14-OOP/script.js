'use strict';

/*
Prototypes. 
    Objects are linked to a prototype object
    Prototypal inheritance - prototype contains methods (behavior) that are accessible to all objects linked to that prototype
    Behavior is delegated to the linked prototype object
Creating prototypes
    1. Constructor functions
        create objects from functions
        built-in objects are created this way (Arrays, Maps, etc)
    2. ES6 classes
        modern altgernative to constructor functions
        it does not behave like classical OOP
        behind the scenes they are created as cunstrucotr functions
    3. Object.create
        easiest and most straightwforward way of linking object to prototype
4 OOP principals still valid (abstraction, encapsulation, inheritance, polymorphism)
*/

// Constructor functions
// build an object by using function
// just usual function the difference is that we call it with 'new'

// arrow functions will not work (does not contains 'this')
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Instance methods
  // Never create method inside constructor function!
  // Use Person.prototype (below)
  //   this.calcAge = function() {
  //     console.log(2022 - this.birthYear);
  //   }
};

const marcin = new Person('Marcin', 1988);
console.log(marcin);

// how 'new' works
// 1. New {} is created
// 2. Function is called, this = {}
// 3. {} linked to prototype (creates __proto__ property)
// 4. function automatically returns {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

const jay = 'Jay';

console.log(marcin instanceof Person);
console.log(jay instanceof Person);

// Prototypes
// Person.prototype - all objects that are created with PErson constructor function will have an access to prototype property
// only one function exists but each instance has an access to it
// we do not keep this method in each instance
console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

// marcin instance does not contain calcAge itself, but it has an access to it by prototype inheritance
console.log(marcin);
marcin.calcAge();
matilda.calcAge();
jack.calcAge();

// check prototype of marcin object
console.log(marcin.__proto__);

console.log(marcin.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(marcin));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

// we can also add properties to prototype
Person.prototype.species = 'Homo Sapiens';
console.log(marcin, matilda);
console.log(marcin.species, matilda.species);

// species is not inside marcin object, it has an access to it due to prototype
console.log(marcin.hasOwnProperty('firstName'));
console.log(marcin.hasOwnProperty('species'));

// each prototype has its own prototypre (up to object.prototype)
console.log(marcin.__proto__.__proto__);
// null is when asking for prototype object object.prototype, it means we a re at the end of prototype chain
console.log(marcin.__proto__.__proto__.__proto__);

// built in objects prototype

const arr = [3, 6, 7, 9, 8, 3];
// all methods of array are in prototype
console.log(arr.__proto__);

// we can modify prototype of built in object, but in general it is not a good idea
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.log(h1.__proto__);

// function has also prototype
console.dir(x => x + 1);
