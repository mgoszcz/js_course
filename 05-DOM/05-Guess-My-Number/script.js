'use strict';

/*
console.log(document.querySelector('.message'));
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = 'Correct number';
console.log(document.querySelector('.message').textContent);
document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 14;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

/*
Implement a game rest functionality, so that the player can make a new guess!
Your tasks:
1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the 'score' and
'secretNumber' variables
3. Restore the initial conditions of the message, number, score and guess input
fields
4. Also restore the original background color (#222) and number width (15rem)
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let highScore = 0;
let currentScore = 20;
// document.querySelector('.number').textContent = secretNumber;
// document.querySelector('.highscore').textContent = highScore;

function resetGame() {
  currentScore = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = currentScore;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
}

function checkHighScore() {
  if (currentScore > highScore) {
    highScore = currentScore;
    document.querySelector('.highscore').textContent = highScore;
  }
}

function wrongAnswer(message) {
  displayMessage(message);
  currentScore--;
}

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  if (currentScore == 0) {
    return;
  }

  if (!guess) {
    displayMessage('No number!');
  } else if (guess === secretNumber) {
    displayMessage('Correct Number!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
    checkHighScore();
  } else if (guess < secretNumber) {
    wrongAnswer('Too low!');
  } else if (guess > secretNumber) {
    wrongAnswer('Too high!');
  }
  document.querySelector('.score').textContent = currentScore;
  if (currentScore == 0) {
    displayMessage('Game Over!');
  }
});

document.querySelector('.again').addEventListener('click', resetGame);
