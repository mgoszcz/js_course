// Remember, we're gonna use strict mode in all scripts now!
"use strict";

const x = 23;
let y = 1;

console.log(2023);

const measureKelvin = function () {
  const measurement = {
    type: "temperature",
    unit: "celsius",
    value: Number(prompt("Degrees celsius: ")),
  };

  console.table(measurement);
  console.log(measurement.value);
  const kelvin = measurement.value + 273;
  return kelvin;
};

console.log(measureKelvin());
