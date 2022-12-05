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
const lastPost2 = await getLastPost();
console.log(lastPost2);
