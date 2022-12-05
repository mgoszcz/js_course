// Exporting module
console.log('Exporting module');

// Blocking code
// top level await will stop whole execution (even other modules/scripts that imports it!!!)
console.log('Start fetching users');
await fetch('https://jsonplaceholder.typicode.com/users');
console.log('Finish fetching');

const shippingCost = 10;
export const cart = [];

// Export must be done in top-level code
// if (true) {
//     export addToCart
// }
// above will not work
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

// Default export when exporting only one item, it does not export name of this but inly a value
// export default function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart`);
// }

// We can have default and named exports from the same file
// but it is not a good practice
