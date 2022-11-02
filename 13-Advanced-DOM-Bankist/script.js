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
// Selecting elements
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

// Creating and inserting elements
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

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });
