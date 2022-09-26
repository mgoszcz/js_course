'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
  },

  ordeDelivery: function({starterIndex = 1, mainIndex = 0, time = '20:00', address}) {
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address}, at ${time}`);
  }
};



// ############################ Destructuring objects
const {name, openingHours, categories} = restaurant
console.log(name, openingHours, categories);

// Use different names than in object
const {name: restaurantName, openingHours: hours, categories: tags} = restaurant
console.log(restaurantName, hours, tags);

// Default values
const {menu = [], starterMenu: starters = []} = restaurant
console.log(menu, starters);

// Switching variables
let a = 111;
let b = 999;
const obj = {a: 23, b: 7, c: 14};
({a, b} = obj);// Replace a and b with values from dictionary
console.log(a, b);

// Nested objects
const {fri: {open: o, close: c}} = openingHours
console.log(o, c);

restaurant.ordeDelivery({
  time: '22.30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 0,
})

restaurant.ordeDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
})

// ############################ Destructuring array
/*
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);


// Take only first two items
const [first, second] = restaurant.categories
console.log(first, second);

// Take first and third element
let [main, , secondary] = restaurant.categories
console.log(main, secondary);

// Switch two variables in one line (like python's x, y = y, x)
[secondary, main] = [main, secondary]
console.log(main, secondary);

// Receive 2 return values from a function
console.log(restaurant.order(2, 0))
const [starter, mainCourse] = restaurant.order(2, 0)
console.log(starter, mainCourse);

// Nested arrays
const nested = [2, 4, [5, 6]]
const [val, , ar] = nested
console.log(val, ar);
const [i, , [j, k]] = nested
console.log(i, j, k);

// Default values
const [f, g, h] = [8, 9]
console.log(f, g, h); // last is undefined
const [f1=1, g1=1, h1=1] = [8, 9] // Default values
console.log(f1, g1, h1);
*/