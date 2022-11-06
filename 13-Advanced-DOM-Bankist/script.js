'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////

// ************************* Smooth Scrolling
// scroll smoothly after clicking 'Learn More'
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // getBoundingClientRect is relative to current viewport
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  // e.target is basically clicked element
  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (x/y)', window.pageXOffset, window.pageYOffset);

  // Scrolling
  // scrollTo(left, top)
  // With this solution it will not work for all positions as it will be relative to viewport
  // window.scrollTo(s1coords.left, s1coords.top);
  // To avoid that add current scroll to left and top
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // smooth scrolling implementation - need to create object instead of passing arguments
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // Modern solution - no need for positions calculation
  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////////////////////
// Page navigation

// First without event delegation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     // Disable default movement to link to implement smooth scrolling
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
// It is unnecessary as we attach event handlers to all elements
// If there will be 10 000 elements it will affect performance

// To avoid that we can use event delegation
// 1. Add event listener to common parent element
// 2. Deterimne what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/////////////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  // const clicked = e.target // will cause an issue as there is <span> inside button and when we click on it we will get it here
  const clicked = e.target.closest('.operations__tab');

  // If we click on tabsContainer 'closest' will nto find any '.operations__tab'
  // and it will be null, in that case we need to get rid of function
  // we will filter out here only clicking on tabs
  if (!clicked) return;

  // Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate content area
  // get number from tab 'data-tab' field
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/////////////////////////////////////////////
// Menu fade animation (fade out other links except the one hovered)
// mouseenter and mouseleave cannot be used here as they are nto bubbled
const fadeEffect = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing 'argument' into handler. By default only event is passed
// if we need to pass more arguments we can use bind method
nav.addEventListener('mouseover', fadeEffect.bind(0.5));
nav.addEventListener('mouseout', fadeEffect.bind(1));

/////////////////////////////////////////////
// Sticky navigation
//// Not a very best solution as scroll event is launched with every scroll

window.addEventListener('scroll', function (e) {
  const initialCoords = section1.getBoundingClientRect();
  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

////

/////////////////////////////////////////////
/////////////////////////////////////////////
///////// LECTURES //////////////////////////
/*
// ******************************** Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// select first
const header = document.querySelector('.header');
//select all
const allSections = document.querySelectorAll('.section');
console.log(allSections);

// get element by ID
document.getElementById('section--1');
// get all elements by tag name
const allButtons = document.getElementsByTagName('button'); // returns HTMLCollection which is dynamically updated
console.log(allButtons);

console.log(document.getElementsByClassName('btn')); // HTMLCollection again

// ******************************** Creating and inserting elements
// insertAdjacentHTML

// Create a cookie message
const message = document.createElement('div'); // created DOM object but it is not yet placed on web page
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.'
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// place message on web page

// it can be placed in one place only
header.prepend(message); // add at the top
header.append(message); // ad at the bottom

// header.before(message) // place before element 'header'
// header.after(message) // place after element 'header'

// header.append(message.cloneNode(true)); // here we can clone DOM element so we can place two of them

// ******************************** Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// ******************************** Styles, attributes, classes
// Styles
// inline styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
// reading like that works only for inline styles set manually by ourselves
// it will not return anything styles set in CSS
console.log(message.style.color);
// with getComputedStyle you can get any style value
console.log(getComputedStyle(message).color);
// make cookie banner 40 px higher than original
// getComputedStyle returns string '123px' so need to be changed to number
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// modify css variables (in :root) - also called custom properties
// can be used to instant change of style on whole webpage
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes (attributes of html tag attributes like 'src' attribute in 'img' tag)
const logo = document.querySelector('.nav__logo');
// JS automatically creates variables with attribute names in objects (works only for expected attributes)
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// will not work as non-standard
console.log(logo.designer);
// how to deal with it
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

// returns absolute link
console.log(logo.src);
// returns relative link (the same as in HTML)
console.log(logo.getAttribute('src'));

// Data attributes (attributes startswith 'data-')
// in example 'data-version-number' needs to be replaced with dataset.versionNumber
console.log(logo.CDATA_SECTION_NODE.versionNumer);

// Classes
logo.classList.add('c', 'd');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// Don't use!!! Use above methods
// logo.className = 'Marcin'


// ************************************** Events
// Event on mouse enter
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great!');
  // with it it will be executed inly once
  // h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);

// another way to add event handler (to not use addEventListener)
// but it is quite old school
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great!');
// };

// Remove event listener - it reuqires named function in addEventListener
// h1.removeEventListener('mouseenter', alertH1);
// remove after timeout
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

*/

// ************************************** Events Bubbling and Capturing
/*
Imagine there is a click event on anchor elemtn with link, click event will be created in document (top of hierarchy)
Then there is a capturing phase wher click event will be moved down to target (element that it happened) through all parent elements
Then there is a target phase and event is handled on target element
Then there is a bubbling phase where click event goes back to root (document) through all parent elements
It is important because if we attach the same event listener also in some parent then it will be also executed during bubbling phase
*/

/*
// add events to navigation manu item and to it's parents, then clicking in item will also trigger events handler in parents,
// but clicking on praent will not trigger event on children
// On event we will change bancground color to random
// for each handler event target (e.target) is the same element (the one clicked),
// but the element where handler is trigeered is different (e.currnetTarget)
// e.currnetTarget is the same as 'this' keyword
// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  this.href = '#';
  console.log('LINK', e.target, e.currentTarget);

  // Stop propagation - parent elements will not get event - not a good idea
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  },
  true
); // With that 'true' it will listen for events in capturing phase and not bubbling phase
// It will be triggered first



// ************************************** DOM traversing
const h1 = document.querySelector('h1');

// Going downwards (selecting children) - it will work no matter how deep child element exists
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); // get all children (nodes, incuding text, comments etc)
console.log(h1.children); // get HTML collection - only html elements
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Go upwards - selecting parents
console.log(h1.parentNode); // all nodes including text, comment
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)'; // select closes header to h1, it goes up in hierarchy (not only closest parent but also higher)
// closest vs querySelector - querySelector finds children and closest finds parents

// Going sideways: siblings (only direct siblings, next to)
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling); // all types of nodes including text and comment
console.log(h1.nextSibling); // all types of nodes including text and comment

// get all siblings (not only those next to) - includes itself
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});

*/
// ************************************** tabbed component
