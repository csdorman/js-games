// alert("app.js connected");
document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');

    //set width of the board
    const width = 10;
    //set initial index for first div in grid
    let currentIndex = 0;
    //set initial position of apple
    let appleIndex = 0;
    //set up snake: 2 is HEAD, 0 is TAIL, 1s are BODY
    let currentSnake = [2, 1, 0];
    //snake attributes
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    // start (and restart) the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        //function randomApple()
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach(index => square[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime);
    }

    // function for dealing with all outcomes of Snake
    function moveOutcomes() {
        // snake hitting border and self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || //snake hitting bottom
                (currentSnake[0] % width === width -1 && direction === 1) || //snake hit right wall
                (currentSnake[0] % width === 0 && direction === -1) || //snake hit left wall
                (currentSnake[0] - width < 0 && direction === -width) || //snake hits top
            squares[currentSnake[0] + direction].classList.contains('snake'); //snake runs into itself
        ) {
            return clearInterval(interval); //if any of the above happen, clear interval
        }
        const tail = currentSnake.pop(); //removes the last item of the array and shows it
        squares[tail].classList.remove('snake'); //removes 'snake' class from TAIL
        currentSnake.unshift(currentSnake[0] + direction); //gives direction to head
        // deal with snake getting the apple
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            //randomApple()
            score++
            
        }
    }



    //set keycodes for snake movement
    function control(e) {
        squares[currentIndex].classList.remove('snake');

        if(e.keyCode === 39) {
            direction = 1; //right arrow key moves snake 1 div right
        } else if (e.keyCode === 38) {
            direction = -width; //up arrow snake moves up 1 row width
        } else if (e.keyCode === 37) {
            direction = -1; //left arrow moves snake 1 div left
        } else if (e.keyCode === 40) {
            direction = +width; // down arrow moves down 1 row width
        }
    };

    document.addEventListener('keyup', control)
});
