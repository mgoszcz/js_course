// Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js'; // imports are always executed first
// addToCart('bread', 5);

// console.log(price, tq);

console.log('Importing module');
// console.log(shippingCost); // illegal as it is in shoppingCart scope

// import everything
import * as ShoppingCart from './shoppingCart.js';

ShoppingCart.addToCart('bread', 5);
console.log(ShoppingCart.totalPrice, ShoppingCart.tq);

// import default export (no need of curly braces)
// import add from './shoppingCart.js';
// add('coal', 3);

// *************** Top-Level await
// can be used in modules only!!

// It blocks execution of whole module
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
// it will not work as it returns still pending promise
console.log(lastPost);

// we can use top level await to fix that
// const lastPost2 = await getLastPost();
// console.log(lastPost2);

// *************** Module pattern

// create new scope, use IIFE to not allow to reuse this code again
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);

// *************** CommonJS Modules

// Below will work only in node.js!!!!

//Export
// export.addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to cart`);
//   };

// // Import
// const { addToCart } = require('./shoppingCart.js')

// *************** NPM installer
// install lodash by 'npm install lodash-es'

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// For using parcel, it can use any package so we can just use package name
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateDeepClone = cloneDeep(state);
stateDeepClone.user.loggedIn = false;
console.log(stateDeepClone);
console.log(state);

// When pushing to git do not push node_modules,
// then you can use 'npm i' to install everything needed by using package.json

// it will maintain state of app on save
if (module.hot) {
  module.hot.accept();
}
