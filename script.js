'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1')


const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

score0El.textContent = 0;
score1El.textContent = 0;

const diceEl = document.querySelector('.dice');
diceEl.classList.add('hidden')

let scores = [0,0]
let currentScore = 0;
let activePlayer = 0;

let Playing = true;

const switchPlayer = function(){
    //If 1 switch to next player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    // if(activePlayer == 1){
    //     player1El.classList.add('player--active');
    //     player0El.classList.remove('player--active')
    // }else{
    //     player1El.classList.remove('player--active');
    //     player0El.classList.add('player--active')
    // }

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

btnRoll.addEventListener('click',function(){
    if(Playing){
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice)


    //2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = "dice-" + dice+ ".png"  // `dice-${dice}.png`


    //3. Check if roll is 1  

    if(dice !== 1){
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        // current0El.textContent = currentScore;

    }else{
        switchPlayer()
    }
}
})

// holding score


btnHold.addEventListener('click',function(){

    if(Playing){

    //1. add score to current
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    //2. Check if score =>100; If true Wins or switch to other player
   if(scores[activePlayer] >= 10){
    Playing = false;
    diceEl.classList.add('hidden')
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    document.querySelector(`#score--${activePlayer}`).textContent = 'Winnerrr !!!'

   } else {
    switchPlayer()
   }
}
})

btnNew.addEventListener('click',function(){
    Playing = true;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`#score--${activePlayer}`).textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    currentScore = 0;
    scores[1] = 0;
    scores[0] = 0;
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active')
    activePlayer = 0;
    

})