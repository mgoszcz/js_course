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

const displayMovements = function (movements, sort = false) {
  // Remove all items from container
  containerMovements.innerHTML = '';

  // sort on a copy of movements to not change movements inside account object
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  // add all items to container from input array
  movs.forEach(function (movement, index) {
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

const calcDisplayBalance = function (account) {
  const balance = account.movements.reduce(
    (accumulator, movement) => accumulator + movement,
    0
  );
  account.balance = balance;
  labelBalance.textContent = `${balance}€`;
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(movement => movement > 0)
    .reduce((acc, movement) => acc + movement, 0);
  labelSumIn.textContent = `${incomes}€`;
  const withdrawals = account.movements
    .filter(movement => movement < 0)
    .reduce((acc, movement) => acc + movement, 0);
  labelSumOut.textContent = `${Math.abs(withdrawals)}€`;
  const interest = account.movements
    .filter(movement => movement > 0)
    .map(movement => (movement * currentAccount.interestRate) / 100)
    .filter(interests => interests >= 1) // interest must be higher than 1 eur to be paid
    .reduce((acc, movement) => acc + movement, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// Events Handlers
let currentAccount;

const updateUI = function () {
  // Display and calculate balance
  calcDisplayBalance(currentAccount);
  // calculate and display summary
  calcDisplaySummary(currentAccount);
  // Calculate and display movements
  displayMovements(currentAccount.movements);
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //button inside 'form' class always refreshes page (submit), here we disable it
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome messgae
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // remove focus from pin
    inputLoginUsername.blur(); // remove focus from user name
    updateUI();
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  if (
    amount > 0 &&
    receiverAccount &&
    amount <= currentAccount.balance &&
    receiverAccount.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(amount * -1);
    receiverAccount.movements.push(amount);
    updateUI();
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});

btnLoan.addEventListener('click', function (e) {
  // Loan can be requested only if there is at least one deposit greater than 10% of request
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov > loanAmount * 0.1)
  ) {
    currentAccount.movements.push(loanAmount);
    updateUI();
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const userName = inputCloseUsername.value;
  const userPin = Number(inputClosePin.value);
  if (userName === currentAccount.userName && userPin === currentAccount.pin) {
    const accountIndex = accounts.findIndex(acc => acc === currentAccount);
    console.log(accountIndex);
    accounts.splice(accountIndex, 1);
    inputClosePin.value = '';
    inputCloseUsername.value = '';
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }
});

let isSorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !isSorted);
  isSorted = !isSorted;
});
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



// FIND method - find item in array

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// will return first element in array
const firstWithdrawal = movements.find(movement => movement < 0);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(account => account.owner === 'Jessica Davis');
console.log(account);

// findIndex method - returns first index of found element defined by callback function



// some and every METHODS
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements.includes(-130)); // returns true if any value in array is equal to -130

// SOME
// check if there is any positive value in array
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// check if there is any deposit above 5000 value in array
const anyDeposits5000 = movements.some(mov => mov > 5000);
console.log(anyDeposits5000);

// EVERY
// only returns true if all elements in array satisfies condition
console.log(movements.every(mov => mov > 0));
console.log(movements.every(mov => mov !== 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));



// flat and flatMap methods

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
const arrDeep = [[1, 2, 3], [4, [4, 5], 5, 6], 7, 8];
console.log(arr);
console.log(arr.flat());
console.log(arr.flat(2)); // second level of nesting
console.log(arrDeep);
console.log(arrDeep.flat());
console.log(arrDeep.flat(2)); // second level of nesting

// flat
// get array of all movements
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// flatMap - flat and map together
// flatMap is always 1 level deep
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);



// Sorting arrays
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); // MUTATES orignal array!
console.log(owners);

// Numbers

console.log(movements);
// return < 0 then a will be before b (keep order)
// return > 0 then b will be before a (switch order)

// sort ascending by numbers
// sort will go thtrough all items until all return < 0
// Ascending
movements.sort((a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
});
console.log(movements);

//Descending
movements.sort((a, b) => {
  if (a > b) return -1;
  if (b > a) return 1;
});
console.log(movements);

// IMPROVED
movements.sort((a, b) => a - b);
console.log(movements);

movements.sort((a, b) => b - a);
console.log(movements);



// Create and fill arrays programatically

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill method
const x = new Array(7); // creates new array with 7 empty elements
console.log(x);
console.log(x.map(() => 5)); // does not work

// x.fill(1); // fill entire array with 1
// x.fill(1, 3); // begin parameter
x.fill(1, 3, 5); // begin and end parameter
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// cretae array 1,2,3,4,5,6,7
// Array.from
const y = Array.from({ length: 7 }, () => 1); // create 1,1,1,1,1,1,1,
console.log(y);
// object with length attr as first param and callback to create mapping as second param
const z = Array.from({ length: 7 }, (_, i) => i + 1); // create 1,2,3,4,5,6,7
console.log(z);

// Array with 100 random dice rolls
const dice = Array.from(
  { length: 100 },
  () => Math.trunc(Math.random() * 6) + 1
);
console.log(dice);

// Example = create array of movements by taking them from UI
// create array from array like object
labelBalance.addEventListener('click', function () {
  const movementsFromUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsFromUI);
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI2);
});

*/

// ARRAY METHODS PRACTICE

// 1. calculate all deposits in the bank
const allDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log(allDepositSum);

// 2. count number of deposits with at least 1000 USD
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => (mov >= 1000 ? acc + 1 : acc), 0);

// cannot use .reduce((acc, mov) => (mov >= 1000 ? acc++ : acc), 0) as acc++ will increase but still returns previous value
// instead you can use ++acc

console.log(numDeposits1000);

// 3. create new object by reduce
// create an object that contains sum of deposits and withdrawals
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (acc, cur) => {
      // cur > 0 ? (acc.deposits += cur) : (acc.withdrawals += Math.abs(cur));
      acc[cur > 0 ? 'deposits' : 'withdrawals'] += Math.abs(cur);
      return acc;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(sums);

// 4. convert any string to title case
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with', 'and'];
  const words = title.toLowerCase().split(' ');
  const resultList = words.map(word => {
    const newWord = exceptions.includes(word)
      ? word
      : word[0].toUpperCase() + word.slice(1);
    return newWord;
  });
  return resultList.join(' ');
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
