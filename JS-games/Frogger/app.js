document.addEventListener('DOMContentLoaded', () => {
    // initial variables
    const squares = document.querySelectorAll('.grid div');
    const timeLeft = document.querySelector('#time-left');
    const result = document.querySelector('#result');
    const startBtn = document.querySelector('#button');
    const carsLeft = document.querySelector('.car-left');
    const carsRight = document.querySelector('.car-right');
    const logsLeft = document.querySelector('.log-left');
    const logsRight = document.querySelector('.log-right');
    const width = 9;
    let currentIndex = 76;
    let timerId ;

    //render frog on starting block
    squares[currentIndex].classList.add('frog');

    //keyboard controls for frog movement
    function moveFrog(e) {
        squares[currentIndex].classList.remove('frog');
        switch(e.keyCoded) {
        case 37:
            if(currentIndex % width !== 0) currentIndex -=1;
            break;
        case 38:
            if(currentIndex - width >=0) currrentIndex -= width;
            break;
        case 39:
            if(currentIndex + 1 <= (width*width)) currentIndex += 1;
            break;
        case 40:
            if(currentIndex + width <= (width*width)) currentIndex += width;
            break;
        }
        square[currentIndex].classList.add('frog');
        lose();
        win();
    }
    // Function to move animate car divs
    function autoMoveCars() {
        carsLeft.forEach(carLeft => moveCarLeft(carLeft));
        carsRight.forEach(carRight => moveCarRight(carRight));
    }
})
