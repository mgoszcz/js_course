'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-10-17T17:01:17.194Z',
    '2022-10-25T23:36:17.929Z',
    '2022-10-30T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, currency, locale) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMovement = formatCur(mov, 'USD', acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovement}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, 'USD', acc.locale);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, 'USD', acc.locale);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), 'USD', acc.locale);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, 'USD', acc.locale);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);

  const now = new Date();

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    day: 'numeric',
    month: 'numeric',
    // weekday: 'long',
  };

  const locale = navigator.language;
  console.log(locale);
  labelDate.textContent = new Intl.DateTimeFormat(acc.locale, options).format(
    now
  );

  // reset timeout value
  time = timeoutValue;
};

const logOutUser = function () {
  currentAccount = undefined;
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';
};

///////////////////////////////////////
// Event handlers
let currentAccount, time, timer;
const timeoutValue = 30;

// ALWAYS logged in for development
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
//

const startLogoutTimer = function () {
  // Set time to 5 minutes
  time = timeoutValue;
  const tick = function () {
    // In each call, print remaining time to UI
    if (time === 0) {
      logOutUser();
      clearInterval(timer);
    }
    const hour = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const minute = `${time % 60}`.padStart(2, 0);
    labelTimer.textContent = `${hour}:${minute}`;
    time--;
  };
  // When time is 0 then stop timer and logoff
  tick();
  // Call the timer every second
  const timer = setInterval(tick, 1000);
  return timer;
};

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Check if any timer exists (re-logging to different user)
    if (timer) clearInterval(timer);

    timer = startLogoutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    logOutUser();
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
//In JS every number is represented as floating point type
console.log(23 === 23.0);
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // incorrect, it is just how it is, there is an issue with 0.1 in binary format

// converting to number
console.log(Number('23'));
console.log(+'23'); // does the same

// Parsing
// Extract number from string (string must start with number otherwise it will not work)
console.log(Number.parseInt('30px'));
console.log(Number.parseInt('e23'));

// radix - base of numeral system we are using, here we use 10 as decimal system
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e23', 10));
// here binary
console.log(Number.parseInt('101rt', 2));

console.log(Number.parseFloat('  2.5rem  '));

// check if any value is a number - not a very good way to check if value is a number
console.log(Number.isNaN(20)); // it is not NaN
console.log(Number.isNaN('20')); // it is not NaN
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(23 / 0)); // infinity is NOT NaN

// better method isFinite - it can be used to check if it is a number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(23 / 0));

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));


// square root
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

// maximum value
console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2));
console.log(Math.max(5, 18, '23px', 11, 2));

// minimum value
console.log(Math.min(5, 18, 23, 11, 2));

// pi - calculate circle area
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// random numbers
// random dice roll
console.log(Math.trunc(Math.random() * 6 + 1));

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max-min) -> min...(max - min + min)
console.log(randomInt(10, 20));

// ************************************ Rounding integers - all does type convewrsion
// truncate after decimal point
console.log(Math.trunc(23.3));

// round to nearest int
console.log(Math.round(23.3));
console.log(Math.round(23.9));

//round up
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

// round down
console.log(Math.floor(23.3));
console.log(Math.floor(23.9));
console.log(Math.floor('23.9'));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

// rounding decimals
// returns a string
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));



// ************************************ remainder operator
// returns remainder of division
console.log(5 % 2);
console.log(8 % 3);
console.log(6 % 2);

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

// Color every second row in different color
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (
    row,
    index
  ) {
    if (index % 2 === 0) {
      row.style.backgroundColor = 'orangered';
    }
  });
});



// ************************************ Numeric separators

// 287,460,000,000
// We can use '_' as a numeric separator in JS
const diameter = 287_460_000_000;
console.log(diameter);

const transferFee1 = 15_00;
const transferFee2 = 1_500; // the same numbers

const PI = 3.14_15;
// const PI = 3._1415; // illegal
console.log(PI);

console.log(Number('230000'));
console.log(Number('230_000')); // will not work



// ************************************ BigInt
console.log(2 ** 53 - 1); // biggest Number JS can safely represent
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1); // invalid result
console.log(2 ** 53 + 10); // invalid result

// BigInt number
console.log(24875628475624837562843652837562843756n);
console.log(BigInt(24875628475624837562843652837562843756)); // will not work correct as JS needs to handle large number in constructor that is not bigint yet

console.log(10000n + 10000n);
console.log(24875628475624837562843652837562843756n * 10000n);
// console.log(24875628475624837562843652837562843756n * 10000); // ILLEGAL

console.log(20n > 15);
console.log(20n === 20);
console.log(20n == 20);

console.log(10n / 3n); // will cut off deciaml part
console.log(10 / 3);


// ************************************ Dates and time

// Create a date
const now = new Date();
console.log(now);

console.log(new Date('Oct 31 2022 18:35:24'));
console.log(new Date('December 24, 2022'));

console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2037, 10, 19, 15, 23, 5)); // MONTH IS 0-BASED!!
console.log(new Date(2037, 10, 31, 15, 23, 5)); // autocorrect to december as novmber has 30 days only

console.log(new Date(0)); // 0 miliseconds after initial unix time
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days after initial unix time (days * hours * minutes * seconds * miliseconds)



// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth()); // 0-BASED!
console.log(future.getDate()); // gets day of month
console.log(future.getDay()); // gets day of week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime()); // timestamp

console.log(new Date(2142253380000)); // date created based on timestamp

console.log(Date.now()); // get current timestamp

future.setFullYear(2040);
console.log(future);



// ************************************ Operations with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future)); // timestamp

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); // returns miliseconds so convert to days

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1);


// ************************************ Internationalizing Dates
const now = new Date();
console.log(new Intl.DateTimeFormat('pl-PL').format(now));
console.log(new Intl.DateTimeFormat('en-US').format(now));

const options = {
  hour: 'numeric',
  minute: 'numeric',
  year: 'numeric',
  day: 'numeric',
  month: 'long',
  weekday: 'long',
};
console.log(new Intl.DateTimeFormat('en-US', options).format(now));
console.log(new Intl.DateTimeFormat('pl-PL', options).format(now));

const locale = navigator.language;
console.log(locale);
console.log(new Intl.DateTimeFormat(locale, options).format(now));


// ************************************ Internationalizing Numbers

const num = 3884764.23;

console.log('US: ', new Intl.NumberFormat('en-US').format(num));
console.log('Syria: ', new Intl.NumberFormat('ar-SY').format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE').format(num));
console.log('Poland: ', new Intl.NumberFormat('pl-PL').format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language).format(num)
);

let options = {
  style: 'unit',
  unit: 'mile-per-hour',
};

console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Poland: ', new Intl.NumberFormat('pl-PL', options).format(num));

options = {
  style: 'percent',
};

console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Poland: ', new Intl.NumberFormat('pl-PL', options).format(num));

options = {
  style: 'currency',
  currency: 'EUR',
};

console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Poland: ', new Intl.NumberFormat('pl-PL', options).format(num));



// ************************************ Timers

// setTimeout

setTimeout(() => console.log('Here is your pizza'), 3000); //callback function and timeout in ms
// it will immediately continue after setTimeout, callback will be triggered asynchronously after 3 s
console.log('Waiting...');

// passing arguments - after timeout
setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  4000,
  'olives',
  'spinach'
);

const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  5000,
  ...ingredients
);
// cancelling timer
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval

setInterval(function () {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  // console.log(now);
  console.log(`${hour}:${minute}:${second}`);
}, 1000); //callback function and timeout in ms

*/
