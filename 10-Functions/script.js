'use strict';

/*

const bookings = [];

// ###################### Default paramters
const createBooking = function (
  flightNum,
  numPAssengers = 1,
  price = 199 * numPAssengers
) {
  const booking = {
    flightNum,
    numPAssengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 3);
createBooking('LH123', undefined, 1000); // leave second parameter as default, set third one



// ###################### Argument: Value vs reference

const flight = 'LH324';
const marcin = {
  name: 'Marcin Goszczynski',
  passport: 23425256,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 23425256) {
    alert('Check In');
  } else {
    alert('Wrong passport');
  }
};

checkIn(flight, marcin);
console.log(flight);
console.log(marcin);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000000);
};

newPassport(marcin);
checkIn(flight, marcin);

// In JS there is only pass by value, even when passing object when changing it items changes common item in a memory,
// it is still passign by value (not reference) as memory address is a value
const abc = function (passenger) {
  passenger = {
    name: 'abc',
    passport: 'abc',
  };
};

abc(marcin);
console.log(marcin);


// ###################### First class and higher-order functions
// first class functions
//      JS treats functions as values (first class citizens) - functions are just another "type" of object
//      they can be stored in variables/properties and can be passed to other functions and can be returned from functions
//      there can be methods called on functions (e.g. bind method)

// higher order functions
//      a function that receives another function as an argument or returns a new function or both
//      example 'addEventListener' is higher order function as it receives 'Callback function' as a parameter
//      callback function - function that is called later by higher order function

// all functions are values

// Functions accepting callback functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [firstWord, ...others] = str.split(' ');
  return [firstWord.toUpperCase(), ...others].join(' ');
};

// Higher-order function - this function operates on higher level of abstraction
// tranforming functionality is moved to a separate "lower level" functions
// higher order function does not care about it
const transformer = function (str, fn) {
  console.log('Original string: ' + str);
  console.log(`Transformed by: ${fn.name}`);
  return fn(str);
};
console.log(transformer('JavaScript is the best!', upperFirstWord));
console.log(transformer('JavaScript is the best!', oneWord));

const high5 = function () {
  console.log('✋');
};

document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

// Functions that returns new function
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greetArrow = greeting => name => {
  console.log(`${greeting} ${name}`);
};

const greeterHey = greet('Hey');
greeterHey('Marcin');
greeterHey('Steven');

greet('Hello')('Marcin');
greetArrow('Hi')('Marcin');


// ###################### call and apply methods

const lufthansa = {
  airline: 'lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Marcin Goszczynski');
lufthansa.book(256, 'John Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// book(23, 'Sarah Wiliams'); //will throw an error as it is now regular function so 'this' will be undefined

// Call method
book.call(eurowings, 23, 'Sarah Wiliams'); // Tell method with which object it should be executed (what is 'this' in this call)
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Airlines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

// Apply method - not used any more
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData); // similar to 'call' but instead passing parameters it requires array of parameters
console.log(swiss);

book.call(swiss, ...flightData); // The same as apply

// ###################### bind method

// book.call(eurowings, 23, 'Sarah Wiliams');

const bookEW = book.bind(eurowings); //it will not call function but will create new function that will use eurowings as 'this'
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');
console.log(eurowings);

const bookEW23 = book.bind(eurowings, 23); // you can also provide function parameters to be bound for each future call
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');
console.log(eurowings);

// With Events Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// Wikl not work!
// Now 'this' keyword will be for button (in event handling methods 'this' always points to object that handler function is attached to)
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// Needs to create new method with 'this' defined correctly - use bind
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
//preset parameters

const addTax = (rate, value) => value + value * rate; // general function for adding tax
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); // new specific function to calc VAT created from general function, predefined rate 0.23, 'null' is before we do nto need 'this' keyword
console.log(addVAT(100));

// const addVAT2 = value => addTax(0.23, value);
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));


// ###################### Immediately Invoked Function Expressions (IIFE)

const runOnce = function () {
  console.log('This will never run again - not true here :)');
};
runOnce();

// by putting everything inside parenthesis we trick JS, then for JS it looks like an expression
// we transform statement to expression, then add () to call it
(function () {
  console.log('This will never run again - now it is true');
  const isPrivate = 23; // It is encapsulated here and cannot be accessed anywhere
})();

// similar to arrow functions
(() => console.log('This will also never run again'))();

// As in modern JS we can declare it within a block so it is not needed to create function for that
{
  const isPrivate = 23; // it also cannot be accessed outside block {}
}
*/

// ###################### Closures

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

// secureBookign execution context with variable environemtn is removed from stack after line 270
// when invoking booker later it's scope chain does not have an access to secureBooking scope and
// it does not have any variables defined but it can still increment passengerCount
// It is because there is a closure. Closure allows functions to access variable environment from
// execution context in which function was declared even when execution context has gone (function returned).
// Closure has higher priority than scope chain.

console.dir(booker); //you can find there a closure within 'Scopes' [[]] - means it is internal property not accessible

// Closure can be defined even without returning function
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 77;
  f = function () {
    console.log(b * 2);
  };
};

g();
f(); // there is a closure even when f was not declared inside g function
// Re-assigning f function
h();
f(); // after reassigning it closed over variable environment from h replacing closure from g

// Another example
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000); // execute function after 1 second

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; //proving that closure has higher priority than scope chain, this variable in global scope will nto affect one in timer
boardPassengers(180, 3);
// Callback function from timer was executed independently from boardPassengers execution context
// but it still has access to variables - closure
