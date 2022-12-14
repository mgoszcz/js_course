'use strict';

// https://restcountries.com/v2/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/*
// *********************** AJAX call: XMLHttpRequest (OLD SCHOOL)
const getCountry = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    // console.log(request.responseText);
    //   console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              Number(data.population) / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].code
            }</p>
        </div>
    </article>
  `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('poland');
getCountryData('usa');
getCountryData('germany');
*/

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                Number(data.population) / 1000000
              ).toFixed(1)} people</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].code
              }</p>
          </div>
      </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // MOVED TO FINALLY
  //   countriesContainer.style.opacity = 1;
};
/*
// *********************** CALLBACK HELL
// Nested callbacks - there is callback inside callback
// It could be infinite callback inside callback
// We call it callback hell
// IT IS BAD PRACTICE
const getCountryAndNeighbour = function (country) {
  // AJAX call first country
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    // console.log(request.responseText);
    //   console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render first country
    renderCountry(data);

    // Get neighbour country
    const neighbour = data.borders?.[0];
    if (!neighbour) return;

    // AJAX call neighbour
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      console.log(this.responseText);
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('poland');
getCountryAndNeighbour('usa');

// *********************** Promises and Fetch API
// FetchAPI
// OLD:
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// NEW with Fetch API
// const request = fetch('https://restcountries.com/v2/name/poland');
// console.log(request);
// request is Promise now
// Promise is an object used as a placeholder for the future result of an asynch operation
// lees formal: container for future value (value is a response from AJAX call)
// promises can be chained (avoiding callback hell)
// Promise can be fulfilled when asynch task finishes succesfully
// Promise can be rejected when there was an error in asynch task

// *********************** Consuming promises

const getCountryData = function (country) {
  const request = fetch(`https://restcountries.com/v2/name/${country}`);
  // What to do when promise fulfilled
  //to read data we need to use json() method, but it will return next promise
  request
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};
getCountryData('poland');


// *********************** Chaining promises

const getCountryData = function (country) {
  const request = fetch(`https://restcountries.com/v2/name/${country}`);
  // What to do when promise fulfilled
  //to read data we need to use json() method, but it will return next promise
  // Country 1
  request
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) return;

      //Country 2
      // This return is a fulfilled value of this promise
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
      // DON'T DO THIS - callback hell again
    //   fetch(`https://restcountries.com/v2/alpha/${neighbour}`).then(response => response.json());
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'));
};
getCountryData('poland');

// *********************** Handling rejected promises

const getCountryData = function (country) {
  const request = fetch(`https://restcountries.com/v2/name/${country}`);
  // What to do when promise fulfilled
  //to read data we need to use json() method, but it will return next promise
  // Country 1
  request
    .then(
      response => response.json()
      //err => alert(err) // Second argument is a callback in case of rejected request
    )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) return;

      //Country 2
      // This return is a fulfilled value of this promise
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
      // DON'T DO THIS - callback hell again
      //   fetch(`https://restcountries.com/v2/alpha/${neighbour}`).then(response => response.json());
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 😵`); // it will catch any error that occur in any place in promise chain
      renderError(`Something went wrong 😵 ${err.message}. Try again...`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('poland');
});

// *********************** Throwing errors manually
*/
const getJSON = function (url, errorMsg = 'Something went wrong') {
  // it will return promise
  return fetch(url).then(response => {
    // Use 'ok' property and use it to throw an error if it is false
    if (!response.ok) {
      throw new Error(`${errorMsg} ${response.status}`);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found');

      //Country 2
      // This return is a fulfilled value of this promise
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
      // DON'T DO THIS - callback hell again
      //   fetch(`https://restcountries.com/v2/alpha/${neighbour}`).then(response => response.json());
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 😵`); // it will catch any error that occur in any place in promise chain
      renderError(`Something went wrong 😵 ${err.message}. Try again...`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
/*
btn.addEventListener('click', function () {
  getCountryData('poland');
});

// *********************** Event loop in practice
// callstack first (test start and test finished)
// promise callback second (it goes into microtasks queue that has higher priority than callback queue)
// timeout callback last as it goes to callback queue

// Timeout callback will be delayed as second promise callback takes some time
// It is important!! timer assures that callback will be not executed BEFORE timeout value
// but it does not guerantee that it will be exrecuted RIGHT AFTER timeout value
/*
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
  // Simulate delay
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log('Test finished');


// *********************** Building promises
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw in progress...');

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      // fulfilled
      resolve('You WIN');
    } else {
      // rejected
      reject(new Error('You lost your money'));
    }
  }, 2000);
});

// Promisifying - convert callback based to microtask (promise)
lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2).then(() => console.log('I have waited for 2 seconds'));

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 seconds passed');
  });

// Above solution is better than below (callback hell)
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Create a fulfilled or rejected promise immediatelly
// To create microtask immediatelly
Promise.resolve('abc').then(x => console.log(x));
Promise.reject('abc').catch(x => console.error(x));



// *********************** Geolocation API
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   error => console.error(error)
// );

const whereAmI = function () {
  getPosition()
    .then(pos => {
      console.log(pos);
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
      return getJSON(
        `https://geocode.xyz/${latitude},${longitude}?geoit=json`,
        'Geocode failed'
      );
    })
    .then(resp => {
      console.log(resp);
      console.log(`You are in ${resp.city}, ${resp.country}`);
      return getJSON(
        `https://restcountries.com/v2/name/${resp.country}`,
        'Country not found'
      );
    })
    .then(resp => {
      renderCountry(resp[0]);
      const neighbour = resp[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found');

      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(resp => renderCountry(resp, 'neighbour'))
    .catch(err => {
      console.error(`${err} 😵`);
    })
    .finally((countriesContainer.style.opacity = 1));
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   error => reject(error)
    // );
    // We can simply do this:
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition()
  .then(pos => console.log(pos))
  .catch(err => console.error(err));

btn.addEventListener('click', function () {
  whereAmI();
});

// *********************** Consuming promises with Async/Await

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Cfreate asynchronous function - keeps running in background when performing code inside
// returns promise when finished
const whereAmI = async function () {
  try {
    const pos = await getPosition();
    const { latitude, longitude } = pos.coords;

    const dataGeo = await getJSON(
      `https://geocode.xyz/${latitude},${longitude}?geoit=json`,
      'Geocode failed'
    );

    // with await it will wait until promise fulfilled
    // it will stop inside async function and will not block  main execution
    // no need to create callbacks or consuming promises
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    // equal to
    // fetch(`https://restcountries.com/v2/name/${country}`).then(res => console.log(res))

    const data = await res.json();
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`!!!!!!!!!!!! ${err}`);
    renderError(`Something went wrong ${err.message}`);
  } finally {
    countriesContainer.style.opacity = 1;
  }
};

console.log('1: Will get location');
const loc = whereAmI();
// Here we have a promise, not a result!!!
console.log(loc);
console.log('2: finished get location');

// *********************** Returning values from async functions
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Cfreate asynchronous function - keeps running in background when performing code inside
// returns promise when finished
const whereAmI = async function () {
  try {
    const pos = await getPosition();
    const { latitude, longitude } = pos.coords;

    const dataGeo = await getJSON(
      `https://geocode.xyz/${latitude},${longitude}?geoit=json`,
      'Geocode failed'
    );

    // with await it will wait until promise fulfilled
    // it will stop inside async function and will not block  main execution
    // no need to create callbacks or consuming promises
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    // equal to
    // fetch(`https://restcountries.com/v2/name/${country}`).then(res => console.log(res))

    const data = await res.json();
    renderCountry(data[0]);
    // will be returned only if successfull
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`!!!!!!!!!!!! ${err}`);
    renderError(`Something went wrong ${err.message}`);

    // Reject promise returned from async function
    throw err;
  } finally {
    countriesContainer.style.opacity = 1;
  }
};

console.log('1: Will get location');
// const loc = whereAmI();
// // Here we have a promise, not a result!!!
// console.log(loc);

// Geting result from promise with then/catch/finally
// whereAmI()
//   .then(city => console.log(city))
//   .catch(err => console.error(err.message))
//   .finally(() => console.log('2: finished get location'));

// Using await
// await can be used only in async functions so for that we can use IIFE
(async function () {
  try {
    const loc = await whereAmI();
    console.log(loc);
  } catch (err) {
    console.error(err.message);
  } finally {
    console.log('2: finished get location');
  }
})();
*/
// *********************** Running promises in parallel
const get3Countries = async function (c1, c2, c3) {
  try {
    // Does not make sense as we call ajax calls one after another but they are not dependent
    // we should run them in parallel
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);

    // Run all in parallel, if one promise reject then whole Promise.all will reject
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map(e => e[0].capital));
  } catch (err) {
    console.log(err);
  }
};

get3Countries('poland', 'canada', 'tanzania');

// *********************** other promise combinators: race, allSettled, any

// Promise.race
// Promise returned by it will first settled of input promises

(async function () {
  const resp = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);
  // here we will get first settled promise (also rejected promises)
  console.log(resp);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long'));
    }, sec * 1000);
  });
};

// We can abort long time taking operations with Promise.race
Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
// IT takes array of promises and returns array of all settled promises
// will nto reject when one of promises rejected
Promise.allSettled([
  Promise.resolve('success'),
  Promise.reject('error'),
  Promise.resolve('another success'),
]).then(res => console.log(res));

// IT will raise an error as one of promises was rejected
Promise.all([
  Promise.resolve('success'),
  Promise.reject('error'),
  Promise.resolve('another success'),
]).then(res => console.log(res));

// Promise.any
// takes an array of multiple promises and will return first fulfilled promise
// it is similar to race but will not return rejected promise
Promise.any([
  Promise.resolve('success'),
  Promise.reject('error'),
  Promise.resolve('another success'),
]).then(res => console.log(res));
