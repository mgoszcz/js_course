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

// import default export
// import add from './shoppingCart.js';
// add('coal', 3);
