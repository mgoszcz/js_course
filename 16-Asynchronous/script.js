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
*/
// *********************** Throwing errors manually

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

btn.addEventListener('click', function () {
  getCountryData('poland');
});
