'use strict';
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));

console.log(airline.slice(4, 7));

console.log(airline.slice(airline.indexOf('Air'), airline.lastIndexOf(' ')));
console.log(airline.slice(0, airline.indexOf(' '))); // get first word
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // get last word

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  return s === 'B' || s === 'E' ? true : false;
};

console.log(checkMiddleSeat('11B'));
console.log(checkMiddleSeat('23C'));
console.log(checkMiddleSeat('3E'));

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnas'; //Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Compare emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);
console.log(trimmedEmail === email);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(normalizedEmail === email);

// replacing
const priceGB = '288,97GBP';
const priceUS = priceGB.replace(',', '.').replace('GBP', 'USD');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate')); // regexp /g - global

//Booleans
const plane2 = 'Airbus A320neo';
console.log(plane2.includes('A320'));
console.log(plane2.includes('Boeing'));
console.log(plane2.startsWith('Airbus'));
console.log(plane2.endsWith('neo'));

if (plane2.startsWith('Airbus') && plane2.endsWith('neo')) {
  console.log('Part of the NEW AIRBUS family');
}

// Practice excercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are nto allowed on board');
  } else {
    console.log('Welcome aboard');
  }
};
checkBaggage('I have a laptop. come Food and a pocket Knife');
checkBaggage('I have a some socks and a camera');
checkBaggage('I have a some snacks and a gun for protection');

// Split and join
console.log('a+very+nice+string'.split('+'));
console.log('Marcin Goszczynski'.split(' '));

const [firstName, lastName] = 'Marcin Goszczynski'.split(' ');
console.log(firstName, lastName);

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (nameStr) {
  const correctNames = [];
  const names = nameStr.split(' ');
  for (const name of names) {
    correctNames.push(name[0].toUpperCase() + name.slice(1).toLowerCase());
  }
  return correctNames.join(' ');
};

const pasenger = 'jessica ann smith davis';
const pasenger2 = 'jEssica aNn sMith daVis';
console.log(capitalizeName(pasenger));
console.log(capitalizeName(pasenger2));

// padding a string
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(35, '+')); // 25 is total length of string with padding, padEnd will add 10 pluses as string with padStart is already 25 length
console.log('Marcin'.padStart(20, '+').padEnd(30, '+'));

//display only 4 last card number digits, mask rest with asterisk
const maskCreditCardNo = function (number) {
  const str = number + ''; //it will convert number to string
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCardNo(12545487));
console.log(maskCreditCardNo(4337234587656787));
console.log(maskCreditCardNo('1234768500988765'));

// repeat
const message2 = 'Bad weather... All Departures Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
};

planesInLine(5);
planesInLine(10);
planesInLine(3);
