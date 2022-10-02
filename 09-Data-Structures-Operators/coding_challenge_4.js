'use strict';
/*
Write a program that receives a list of variable names written in underscore_case
and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below to
insert the elements), and conversion will happen when the button is pressed.
Test data (pasted to textarea, including spaces):
underscore_case
first_name
Some_Variable
calculate_AGE
delayed_departure
Should produce this output (5 separate console.log outputs):
underscoreCase ✅
firstName ✅✅
someVariable ✅✅✅
calculateAge ✅✅✅✅
delayedDeparture ✅✅✅✅✅
Hints:
§ Remember which character defines a new line in the textarea 😉
§ The solution only needs to work for a variable made out of 2 words, like a_b
§ Start without worrying about the ✅. Tackle that only after you have the variable
name conversion working 😉
§ This challenge is difficult on purpose, so start watching the solution in case
you're stuck. Then pause and continue!
*/
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const textAreaObject = document.querySelector('textarea');
const buttonObject = document.querySelector('button');

const convertCase = function () {
  const inputText = textAreaObject.value.split('\n');
  console.log(inputText);
  for (const [i, item] of inputText.entries()) {
    const words = item.split('_');
    let resultString = words[0].trim().toLowerCase();
    for (const word of words.slice(1)) {
      resultString += word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
    console.log(`${resultString.padEnd(20)} ${'✅'.repeat(i + 1)}`);
  }
};

buttonObject.addEventListener('click', convertCase);
