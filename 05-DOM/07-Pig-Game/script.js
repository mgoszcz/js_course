'use strict';

const scorePlayer1Element = document.querySelector('#score--0');
const scorePlayer2Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const rollDiceButtonElement = document.querySelector('.btn--roll');
const newGameButtonElement = document.querySelector('.btn--new');
const holdButtonButtonElement = document.querySelector('.btn--hold');
const currentScorePLayer1Elemen = document.getElementById('current--0');
const currentScorePLayer2Elemen = document.getElementById('current--1');

let currentScore = 0;

const scores = [0, 0];
let activePlayer = 0;

const resetGame = function () {
  currentScore = 0;
  scorePlayer1Element.textContent = 0;
  scorePlayer2Element.textContent = 0;
  currentScorePLayer1Elemen.textContent = 0;
  currentScorePLayer2Elemen.textContent = 0;
  diceElement.classList.add('hidden');
  activePlayer = 0;
  scores[0] = 0;
  scores[1] = 0;
  holdButtonButtonElement.classList.remove('hidden');
  rollDiceButtonElement.classList.remove('hidden');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
};

const switchPlayer = function () {
  // Mozna tez uzyc classlist.toggle na kazdej klasie
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

resetGame();

// Rolling dice functionality
rollDiceButtonElement.addEventListener('click', function () {
  // 1. Denerate random dice roll (1-6)
  const dice = Math.trunc(Math.random() * 6) + 1;
  // 2. Display dice
  diceElement.classList.remove('hidden');
  diceElement.src = `dice-${dice}.png`;

  // 3. Check for rolled 1, if true the switch next player else add to current
  if (dice !== 1) {
    //add to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //switch to next player
    switchPlayer();
  }
});

holdButtonButtonElement.addEventListener('click', function () {
  // 1. Add curent to total
  scores[activePlayer] += currentScore;
  scorePlayer1Element.textContent = scores[0];
  scorePlayer2Element.textContent = scores[1];
  // 2. If total > 100 then player wins
  if (scores[activePlayer] >= 100) {
    holdButtonButtonElement.classList.add('hidden');
    rollDiceButtonElement.classList.add('hidden');
    diceElement.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
  }
  // 3. Reset current and switch player
  switchPlayer();
});

newGameButtonElement.addEventListener('click', resetGame);
