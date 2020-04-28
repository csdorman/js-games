alert('app.js connected')

const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');

// use "let" instead of "const", since this will change throughout game (const don't change)
let score = document.querySelector('#score');
let result = 0;

function randomSquare() {
    // remove mole class (and any leftoever styling)
    square.forEach(className => {
        className.classList.remove('mole');
    });
    //define a random position on the grid with math random
    let randomPosition = square[Math.floor(Math.random()* 9)];
    //add mole class to the randomly-picked square.
    randomPosition.classList.add('mole');

    //assign the id of the randomPosition to hitPosition to use later
    hitPosition = randomPosition;
};

square.forEach( id => {
    id.addEventListener('mouseup', () => {
        if(id.id === hitPosition){
            result = result + 1;
            score.textContent = result;
        }
    });
});
