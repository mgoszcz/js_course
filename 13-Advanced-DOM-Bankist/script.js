'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
*/

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

// ************************************** Events Bubbling and Capturing
/*
Imagine there is a click event on anchor elemtn with link, click event will be created in document (top of hierarchy)
Then there is a capturing phase wher click event will be moved down to target (element that it happened) through all parent elements
Then there is a target phase and event is handled on target element
Then there is a bubbling phase where click event goes back to root (document) through all parent elements
It is important because if we attach the same event listener also in some parent then it will be also executed during bubbling phase
*/
