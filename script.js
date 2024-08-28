"use strict";
//selecting elements
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");

const secore0EL = document.querySelector("#score--0");
const secore1EL = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");

//starting conditions
secore0EL.textContent = 0;
secore1EL.textContent = 0;
diceEl.classList.add("hidden");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const swichPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};

//rolling dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2.display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `./img/dice-${dice}.png`;
    //3.check for rolled 1: if true to next player

    if (dice !== 1) {
      //add dice to current socre
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0EL.textContent=currentScore ;
    } else {
      //swich to next player
      swichPlayer();
    }
  }
});
//hold
btnHold.addEventListener("click", function () {
  if (playing) {
    //1 add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2 check if player's score
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player-active");
    } else {
      swichPlayer();
    }
  }
  //switch to the next player
});

btnNew.addEventListener("click", function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  secore0EL.textContent = 0;
  secore1EL.textContent = 0;
  diceEl.classList.add("hidden");
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");
});
