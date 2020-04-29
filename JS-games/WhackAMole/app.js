// use 'const' since these don't change
const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');

// use "let" instead of "const", since this will change throughout game (const don't change)
let score = document.querySelector('#score');
let result = 0;
let currentTime = timeLeft.textContent;

function randomSquare() {
    // remove mole class (and any leftover styling)
    square.forEach(className => {
        className.classList.remove('mole');
    });
    //define a random position on the grid with math random
    let randomPosition = square[Math.floor(Math.random()* 9)];
    //add mole class to the randomly-picked square.
    randomPosition.classList.add('mole');

    //assign the id of the randomPosition to hitPosition to use later
    hitPosition = randomPosition.id;
};
// hit detection for mole
square.forEach( id => {
    id.addEventListener('mouseup', () => {
        if(id.id === hitPosition){
            result = result + 1;
            score.textContent = result;
        }
    });
});
// move the mole around (at a preset time interval)
function moveMole() {
    let timerId = null;
    timerID = setInterval(randomSquare, 1000);
}
moveMole();
// countdown from set time to zero - when 0, game over.
function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if(currentTime === 0 ) {
        clearInterval(timerId);
        alert('GAME OVER, MAN! Your final score is ' + result );
    }
}

let timerId = setInterval(countDown, 1000);
