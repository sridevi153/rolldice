'use strict';
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const roll = document.querySelector('.btn--roll');
const newgame = document.querySelector('.btn--new');
const hold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let activeplayer, current, score, playing;

const initial = function () {
  playing = true;
  activeplayer = 0;
  current = 0;
  score = [0, 0];
  dice.classList.add('hidden');
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  document.querySelector('.player--0 .name').textContent = 'Player 1';
  document.querySelector('.player--1 .name').textContent = 'Player 2';
};

initial();

const switchplayers = function () {
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

roll.addEventListener('click', function () {
  if (playing) {
    dice.classList.remove('hidden');
    const number = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${number}.png`;
    if (number != 1) {
      current += number;
      document.querySelector(`#current--${activeplayer}`).textContent = current;
    } else {
      current = 0;
      document.querySelector(`#current--${activeplayer}`).textContent = current;
      switchplayers();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    score[activeplayer] += current;
    document.querySelector(`#score--${activeplayer}`).textContent =
      score[activeplayer];
    current = 0;
    document.querySelector(`#current--${activeplayer}`).textContent = current;
    if (score[activeplayer] >= 100) {
      playing = false;
      dice.classList.add('hidden');
      document.querySelector(
        `.player--${activeplayer} .name`
      ).textContent = `player ${activeplayer + 1} won!!🎉`;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      switchplayers();
    }
  }
});

newgame.addEventListener('click', initial);
