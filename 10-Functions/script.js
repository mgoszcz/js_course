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
*/

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
