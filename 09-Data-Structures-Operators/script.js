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

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  ordeDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address}, at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

/*

// ############################ Destructuring objects
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// Use different names than in object
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Switching variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj); // Replace a and b with values from dictionary
console.log(a, b);

// Nested objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

restaurant.ordeDelivery({
  time: '22.30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 0,
});

restaurant.ordeDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

// ############################ Destructuring array

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


// ############################ Spread element
// How to add two items at the beginning of array
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr]; // spread takes all elements out and puts them individually
console.log(...newArr);
console.log(1, 2, 7, 8, 9);

const newMenu = [...restaurant.mainMenu, 'Gnocchi'];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

//join 2 arrays or more
const allMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(allMenu);

// Iterables: arrays, strings, maps, sets BUT NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);

// const ingredients = [
//   prompt("Let's make pasta. Ingredient 1?"),
//   prompt("Let's make pasta. Ingredient 2?"),
//   prompt("Let's make pasta. Ingredient 3?"),
// ];
// console.log(ingredients);
// restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Marco' };
console.log(newRestaurant);

const restuarantCopy = { ...restaurant };
restuarantCopy.name = 'Ristorante Roma';
console.log(restuarantCopy.name);
console.log(restaurant.name);

// ############################ Rest pattern and rest parameters

// DSETRUCTURING

//Spread beacuse on RIGHT side of =
// const arr = [1, 2, ...[3, 4]];

//REST, because on LEFT side of =
const [aRest, bRest, ...others] = [1, 2, 3, 4, 5];
console.log(aRest, bRest, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// FUNCTIONS
const add = function (...args) {
  let result = 0;
  for (const item of args) {
    result += item;
  }
  return result;
};

console.log(add(1, 2, 3));
console.log(add(5, 7));
console.log(add(3, 4, 5, 6, 7));

const x = [1, 2, 3];
console.log(add(...x));

restaurant.orderPizza('salami', 'mushrooms', 'peperoni', 'cheese');
restaurant.orderPizza('mushrooms');

// ############################ short circuiting (&& and ||)
// Use any data type, return any data type, short-circuitng
// OR
console.log(3 || 'Jonas'); // OR - if first value is thruthy it will return it immediately (without checking second value)
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null); //returns first thruthy value
console.log(undefined || 0 || '' || false || null); // last value even if it is falsy

// restaurant.numGuests = 0 // it will won't work as we want
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);
//Return default value
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// AND
console.log(0 && 'Jonas'); // return first falsy value
console.log(7 && 'Jonas'); // Returns last value if all are thruthy (even if last if thruthy)

console.log('Hello' && 23 && null && 'Jonas');

// practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
// the same is:
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// ############################ nullish coalescing operator
restaurant.numGuests = 0; // it will won't work as we want
//Return default value
const guests3 = restaurant.numGuests || 10; // if numGuests is 0 it will return 10 as 0 is falsy, it is incorrect for us
console.log(guests3);

//works with concept of nullish values instead of falsy
// nullish: null and undefined (NOT 0 or '' or false)
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);

// ############################ logical assignment operators

const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Paolo',
};

// ## OR assignment operator
// apply numGuests to restaurants that does nto have it
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// the same as above:
// rest1.numGuests ||= 10; // does nto work when numGuests is already defined and is 0 (0 is falsy)
// rest2.numGuests ||= 10;

rest1.numGuests ??= 10; // does work when numGuests is already defined and is 0 (0 is NOT nullish)
rest2.numGuests ??= 10;

// AND assignment operator - assignmning value to variable if it is already thruthy
// replase owner with string 'anonymous'
rest1.owner &&= '<anonymous>';
rest2.owner &&= '<anonymous>';
// equals rest2.owner = rest2.owner && '<anonymous>'

console.log(rest1);
console.log(rest2);

// ############################ looping array for-of loop
const menuFull = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menuFull) console.log(item);

for (const item of menuFull.entries()) console.log(item); // enumerate z pythona
for (const [index, item] of menuFull.entries()) console.log(index, item);



// ############################ Enhanced object literals

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    // Attribute name can be calculated
    open: 0, // Open 24 hours
    close: 24,
  },
};

// const restaurant2 = {
//   openingHours: openingHours,
// };
//CAN BE DONE WITH

// const restaurant2 = {
//   openingHours,
// };

// ENHANCED METHOD DECLARATION
const restaurant2 = {
  openingHours,
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

console.log(restaurant2);
console.log(restaurant2.order(2, 0));



// ############################ Optional chaining (?.)
//print monday (but it does not exist)
console.log(restaurant.openingHours.mon);
// console.log(restaurant.openingHours.mon.open);

if (restaurant.openingHours && restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

// With optional chaining
console.log(restaurant.openingHours?.mon?.open); // Only if monday exists it will be read, otherwise undefined

// Example
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of weekdays) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed'
  console.log(`On ${day} we open at ${open}`);
}

//Methods
console.log(restaurant.order?.(0,1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0,1) ?? 'Method does not exist');

//Arrays
const users = [
  {name: 'Jonas', email: 'hello@jonas.io'}
];
console.log(users[0]?.name ?? 'User array empty');



// ############################ Looping objects

const openingHours = restaurant.openingHours
// Over property names (keys)
for  (const day of Object.keys(openingHours)) console.log(day);
const properties = Object.keys(openingHours)
let openStr = `We are open on ${properties.length} days: `
for (const day of properties) {
  openStr += `${day}, `
}
console.log(openStr);

//Property values
const values = Object.values(openingHours)
console.log(values);

// Entire object
const entries = Object.entries(openingHours)
console.log(entries);

// [key, value]
for (const [key, {open, close}] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
*/

// ############################ Sets
// collection of unique values
const ordersSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta', 'Pizza'])
console.log(ordersSet);
console.log(new Set('Jonas'));

// Get size of set
console.log(ordersSet.size);
// Check if element in set
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));

// Add new elements
ordersSet.add('Garlic Bread')
ordersSet.add('Garlic Bread')
console.log(ordersSet);

//Delete element
ordersSet.delete('Garlic Bread')
console.log(ordersSet);

// clear set
// ordersSet.clear()

// Get item from set
for (const order of ordersSet) console.log(order);

//Example
//Remove duplicates from arrays
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)] //create new array from set
console.log(staffUnique);
console.log(new Set(staff).size); // just get count of unique positions

//counting letters
console.log(new Set('MarcinGoszczynski').size);