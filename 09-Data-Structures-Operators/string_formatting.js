'use strict';
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const flightsSplit = flights.split('+');
console.log(flightsSplit);

for (const flight of flightsSplit) {
  const words = flight.split(';');
  const output = [
    words[0].split('_').join(' '),
    `from ${words[1].slice(0, 3).toUpperCase()}`,
    `to ${words[2].slice(0, 3).toUpperCase()}`,
    `(${words[3].replace(':', 'h')})`,
  ];
  const emoji = words[0].includes('Delayed') ? '🔴' : '';
  console.log(`${emoji} ${output.join(' ')}`.padStart(50));
}
