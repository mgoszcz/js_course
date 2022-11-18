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

/*
// ****************** Constructor functions
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

// ****************** Prototypes
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

// ****************** ES6 classes
// class expression
// const PersonCl = class {}

// class declaration
// in general it will create the same as function constructor with prototype chain
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // It will be still in prototype not in an object
  calcAge() {
    console.log(2022 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2022 - this.birthYear;
  }

  get fullName() {
    return this._fullName;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  // static method
  static hey() {
    console.log('hey there!');
  }
}

// const jessica = new PersonCl('Jessica', 1996);
const jessicaFull = new PersonCl('Jessica Davis', 1996);
// console.log(jessica);
console.log(jessicaFull);
console.log(jessicaFull.age);

const walter = new PersonCl('Walter White', 1965);
console.log(walter);

// PersonCl.prototype.greet = function() {
//   console.log(`Hey ${this.firstName}`);
// }

// 1. Classes are NOT hoisted (we cannot use them before declaration)
// 2. Classes are first-class citizens (can be passed to functions and returned by functions)
// 3. Classes are executed in strict mode

// ****************** Setters and getters
const accounts = {
  owner: 'marcin',
  movements: [200, 300, 530, 120],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(movement) {
    this.movements.push(movement);
  },
};

console.log(accounts.latest);
accounts.latest = 876;
console.log(accounts.latest);
console.log(accounts);

// ****************** Static methods
/*
Array.from - from method is attached to Array constructor and cannot be used on array
[1,2,3].from() will not work
arrays does nto inherit this method as it is not attached to a prototype

the same with Number.parseFloat()
*/
/*
Person.hey = function () {
  console.log('hey there!');
};
Person.hey();
// marcin.hey(); - will throw an error

//static hey() {
//  console.log('hey there!');
//}
// in ES6 class
PersonCl.hey();

// ****************** Object.create
// no prototypes, constructor and new
const PersonProto = {
  calcAge() {
    console.log(2022 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
console.log(steven);
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);

sarah.calcAge();
*/

// ****************** Inheritance between classes
// ****************** Constructor functions
// create student clas sthat will inherit from Person
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Must be done before adding new methods to prototype
Student.prototype = Object.create(Person.prototype);
// At this point Student.prototype is an empty object {} with __proto__ equal to Person.prototype
// Then we can add methods specific for student to Student.prototype
// Then when we call them it will look for methods in Student proto, if not found then it will look in Person proto
console.log(Student.prototype.__proto__ === Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2000, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();

// It thinks contructor is Person as we use Object.create above
console.dir(Student.prototype.constructor);
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

console.log(mike instanceof Student);
console.log(mike instanceof Person);

// ****************** Inheritance between classes
// ****************** ES6 classes

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // It will be still in prototype not in an object
  calcAge() {
    console.log(2022 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2022 - this.birthYear;
  }

  get fullName() {
    return this._fullName;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  // static method
  static hey() {
    console.log('hey there!');
  }
}

class StudentCL extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first as will create 'this'
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
}

const martha = new StudentCL('Martha Jones', 2002, 'Cuomputer Science');
martha.introduce();
martha.calcAge();

// ****************** Inheritance between classes
// ****************** Object.create()
const PersonProto = {
  calcAge() {
    console.log(2022 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);

jay.init('Jay', 1990, 'Computer Science');
jay.introduce();
jay.calcAge();
