document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const resultDisplay = document.querySelector('#result');
    let width = 15;
    let currentShooterIndex = 202;
    let currentInvaderIndex = 3;
    let alienInvaderTakenDown = [];
    let result = 0;
    let direction = 1;
//    let invaderId

    // Define the alien invaders within the array
    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ];

    // Draw the alien invaders
    alienInvaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'));

    // Draw the shooter
    squares[currentShooterIndex].classList.add('shooter');

    // Move the shooter (horizontally only)
    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove('shooter');
        switch(e.keyCode) {
        case 37:
            if(currentShooterIndex % width !== 0) currentShooterIndex -=1;
            break;
        case 39:
            if(currentShooterIndex % width < width -1) currentShooterIndex +=1;
            break;
        }
        squares[currentShooterIndex].classList.add('shooter');
    }

    document.addEventListener('keydown', moveShooter);

    //move the alien invaders
    function moveInvaders() {
        // need to define left and right edge separately to prevent overrunning the board
        // left edge of the invader block is the first invader in the block
        const leftEdge = alienInvaders[0] % width === 0;
        // right edge is length of invader block divided by the width of the board
        const rightEdge = alienInvaders[alienInvaders.length -1] % width === width -1;

        if((leftEdge && direction === -1) || (rightEdge && direction === 1)){
            direction = width;
        } else if (direction === width){
            if (leftEdge) direction = 1;
            else direction = -1;
        }
        for (let i = 0; i <= alienInvaders.length -1; i++) {
            squares[alienInvaders[i]].classList.remove('invader');
        }
        for (let i = 0; i <= alienInvaders.length -1; i++) {
            alienInvaders[i] += direction;
        }
        for (let i = 0; i <= alienInvaders.length -1; i++) {
            squares[alienInvaders[i]].classList.add('invader');
        }

        // Game over conditions
        // If any Invaders reach the Shooter, end game
        if(squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
            resultDisplay.textContent = 'Game Over';
            squares[currentShooterIndex].classList.add('boom');
            clearInterval(invaderID);
        }

        // If any Invaders reach the very bottom of the board, end game
        for (let i = 0; i <= alienInvaders.length -1; i++) {
            if(alienInvaders[i] > (squares.length - (width-1))) {
                resultDisplay.textContent = 'Game Over';
                clearInverval(invaderId);
            }
        }
    }
    invaderId = setInterval(moveInvaders, 500);

    
});
