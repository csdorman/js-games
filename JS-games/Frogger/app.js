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

    //move the car left on a loop
    function moveCarLeft(carLeft) {
        switch(true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1');
            carLeft.classList.add('c2');
            break;
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2');
            carLeft.classList.add('c3');
            break;
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3');
            carLeft.classList.add('c1');
            break;
        }
    }

    //move the car right on a loop
    function moveCarRight(carRight) {
        switch(true) {
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1');
            carRight.classList.add('c3');
            break;
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2');
            carRight.classList.add('c1');
            break;
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3');
            carRight.classList.add('c2');
            break;
        }
    }

    //move the logs
    function autoMoveLogs() {
        logsLeft.forEach(logLeft => moveLogLeft(logLeft));
        logsRight.forEach(logRight => moveLogRight(logRight));
    }

    // move the log left on a loop
    function moveLogLeft(logLeft) {
        switch(true) {
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1');
            logLeft.classList.add('l2');
            break;
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2');
            logLeft.classList.add('l3');
            break;
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3');
            logLeft.classList.add('l4');
            break;
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4');
            logLeft.classList.add('l5');
            break;
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5');
            logLeft.classList.add('l1');
            break;
        }
    }

    // move the log right on a loop
    function moveLogRight(logRight) {
        switch(true) {
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1');
            logRight.classList.add('l5');
            break;
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2');
            logRight.classList.add('l1');
            break;
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3');
            logRight.classList.add('l2');
            break;
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4');
            logRight.classList.add('l3');
            break;
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5');
            logRight.classList.add('l4');
        }
    }

    //rules to win
    function win() {
        if (squares[4].classList.contains('frog')) {
            result.innerHTML = 'Congratulations, you won!';
            squares[currentIndex].classList.remove('frog');
            clearInterval(timerId);
            document.removeEventListener('keyup', moveFrog);
        }
    }


    {})

