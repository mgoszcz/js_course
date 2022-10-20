'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  // Remove all items from container
  containerMovements.innerHTML = '';

  // add all items to container from input array
  movements.forEach(function (movement, index) {
    const movementType = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${movementType}">${
      index + 1
    } ${movementType}</div>
        <div class="movements__value">${movement}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

const createUserNames = function (accounts) {
  accounts.forEach(function (account) {
    account.userName = account.owner
      .toLowerCase()
      .split(' ')
      .map(singleName => singleName[0])
      .join('');
  });
};

createUserNames(accounts);
// console.log(accounts);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce(
    (accumulator, movement) => accumulator + movement,
    0
  );
  labelBalance.textContent = `${balance}€`;
};
calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(movement => movement > 0)
    .reduce((acc, movement) => acc + movement, 0);
  labelSumIn.textContent = `${incomes}€`;
  const withdrawals = movements
    .filter(movement => movement < 0)
    .reduce((acc, movement) => acc + movement, 0);
  labelSumOut.textContent = `${Math.abs(withdrawals)}€`;
  const interest = movements
    .filter(movement => movement > 0)
    .map(movement => (movement * 1.2) / 100)
    .filter(interests => interests >= 1) // interest must be higher than 1 eur to be paid
    .reduce((acc, movement) => acc + movement, 0);
  labelSumInterest.textContent = `${interest}€`;
};
calcDisplaySummary(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE method
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
console.log(arr.slice()); // copy
console.log([...arr]); // also copy

// SPLICE method - changes original array (mutates it)
// console.log(arr.splice(2)); // it takes elements 2-end and removed them from original array
arr.splice(-1); // typical usecase, remove last element
console.log(arr);

// REVERSE method - mutates original array
arr = ['a', 'b', 'c', 'd', 'e', 'f'];

const arr2 = ['k', 'j', 'i', 'h', 'g'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // same as concat

// JOIN method
console.log(letters.join(' - '));

// AT method
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0)); // indexation, same as []

// get the last array element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1)); // simplest solution

console.log(arr.at(-2));

// also works on strings
console.log('Marcin'.at(-1));


// Looping arrays: forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
console.log('**********************');
// The  same result woth forEach method
// forEach will iterate through all elements and call callback function on each iteration
// When calling it will pass current element, index and entire array as arguments
// !!!!!!!!! YOU CAN'T USE brake/continue IN FOREACH, FFOR THAT USE for of
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
  // console.log(array);
});


// forEach with Maps and Sets
// MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// For map it will pass current value, current key and entire map as parameters
currencies.forEach(function (value, key, entireMap) {
  console.log(`${key}: ${value}`);
});

// SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
// For set it will pass current value, current value (set does nto have index/key) and entire set
currenciesUnique.forEach(function (value, valueAgain, set) {
  console.log(`${valueAgain}: ${value}`);
});



// MAP method - create new array with each element modified by callback function
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//convert movements in EUr to USD
const eurToUsd = 1.1;

const movementsUsd = movements.map(function (currentElement) {
  return currentElement * eurToUsd;
});
const movementsUsdArrow = movements.map(
  currentElement => currentElement * eurToUsd
);
console.log(movements);
console.log(movementsUsd);
console.log(movementsUsdArrow);


// FILTER method - create new array with elements filtered out from original array
//

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(function (movement) {
  // callback function should return bool
  return movement > 0;
});

const withdrawals = movements.filter(movement => movement < 0);
console.log(deposits);
console.log(withdrawals);


// REDUCE method - boil down all elements in array to one single value

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// first parameter in callback is an accumulator of previous elements
// second paramtere in reduce is initial value
const balance = movements.reduce(function (accumulator, currentElement) {
  return accumulator + currentElement;
}, 0);
const balanceArrow = movements.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
console.log(balance);
console.log(balanceArrow);

// Maximum value
const maxValue = movements.reduce(
  (accumulator, currentValue) =>
    currentValue > accumulator ? currentValue : accumulator,
  movements[0]
);
console.log(maxValue);


// CHAINING METHODS

// take all of deposites and convert to USD and sum
// map and filter will return array so we can again call array methods on that
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(movement => movement > 0)
  // .map((movement, i, array) => {
  //   //debugging, we can inspect current array at any level of chaining
  //   console.log(array);
  //   movement * eurToUsd;
  // })
  .map(movement => movement * eurToUsd)
  .reduce((accumulator, movement) => accumulator + movement, 0);
console.log(totalDepositsUSD);

*/

// FIND method - find item in array

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// will return first element in array
const firstWithdrawal = movements.find(movement => movement < 0);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(account => account.owner === 'Jessica Davis');
console.log(account);
