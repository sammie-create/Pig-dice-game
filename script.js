"use strict";

const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");

let playing, currentScore, scores, activePlayer;

//Initial State

function init() {
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  scores = [0, 0];

  activePlayer = 0;
  diceEl.classList.add("hidden");
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;

  player1.classList.add("player--active");
  player1.classList.remove("player--winner");
  player2.classList.remove("player--active");
  player2.classList.remove("player--winner");
}

//Switch player function

function switchPlayer() {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
}

init();

btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice roll
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");

    //3. Check if rolled a 1
    if (dice !== 1) {
      //4. Add dice roll to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;

      //5. Switch Player
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. Add current score to total scores
    scores[`${activePlayer}`] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[`${activePlayer}`];

    //2. Check if player scores 100 and finish game
    if (scores[`${activePlayer}`] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      diceEl.classList.add("hidden");
      playing = false;

      //3. Switch player
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
