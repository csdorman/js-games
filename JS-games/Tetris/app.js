document.addEventListener('DOMContentLoaded', () => {
    // define the grid as the html div
    const grid = document.querySelector('.grid');
    // create an array from all the html divs in .grid
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    // define the width of the board
    const width = 10;
    let nextRandom = 0;
    let timerId;
    let score = 0;

    // The Tetromino shapes
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 +2],
        [1, width +1, width * 2, width * 2 +1],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];
    const backLTetromino = [
        [0, 1, width + 1, width * 2 + 1],
        [width, width + 1, width + 2, 2],
        [1, width + 1, width * 2 + 1, width * 2 + 2],
        [width, width + 1, width + 2, width *2]
    ]
    const zTetromino = [
        [width * 2, width + 1, width * 2 + 1, width + 2],
        [0, width, width + 1, width * 2 + 1],
        [width * 2, width + 1, width * 2 + 1, width + 2],
        [0, width, width + 1, width * 2 + 1]
    ];
    const backZTetromino = [
        [1, width, width + 1, width * 2],
        [0, 1, width + 1, width + 2],
        [1, width, width + 1, width * 2],
        [0, 1, width + 1, width + 2]
    ]
    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ];
    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];
    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];

    // create array for tetrominoes
    const theTetrominoes = [lTetromino, backLTetromino, zTetromino, backZTetromino, tTetromino, oTetromino, iTetromino];

    // set start position on grid and initial rotation
    let currentPosition = 4;
    let currentRotation = 0;

    //randomly select a Tetromino and first rotation
    let random = Math.floor(Math.random()*theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];

    // draw the Tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        });
    }
    // remove the Tetromino from screen
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
        });
    }

    // assign controls to arrow keys
    function control(e) {
        if(e.keyCode === 37) { //left arrow
            moveLeft();
        } else if(e.keyCode === 38) { //up arrow
            rotate();
        } else if(e.keyCode === 39) { //right arrow
            // move right
            moveRight();
        } else if(e.keyCode === 40) { //down arrow
            moveDown();
        }
    }
    document.addEventListener('keyup', control);

    //move the tetromino
    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    //stop the tetromino on the bottom row
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            // create new tetromino
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
            addScore();
            gameOver();
        };
    }

    // move tetromino left - unless it is at the edge or blocked
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        if(!isAtLeftEdge) currentPosition -= 1;
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition +=1;
        }
        draw();
    }

    // move the tetromino right - unless it is at the edge or blocked
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1);
        if(!isAtRightEdge) currentPosition += 1;
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw();
    }

    // rotate the tetromino
    function rotate() {
        undraw();
        currentRotation ++;
        if(currentRotation === current.length) { //if current rotation is 4, go back to 0
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentRotation];
        draw();
    }

    // show up-next tetromino in the mini-grid display
    //const displaySquares = document.querySelectorAll('.mini-grid div');
    let displaySquares = Array.from(document.querySelectorAll('.mini-grid div'));
    const displayWidth = 4;
    const displayIndex = 0;

    // the tetrominoes without rotations
    const upNextTetrominoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
        [0, 1, displayWidth + 1, displayWidth * 2 + 1], //backLTetromino
        [displayWidth * 2, displayWidth + 1, displayWidth * 2 + 1, displayWidth + 2], //zTetromino
        [1, displayWidth, displayWidth + 1, displayWidth * 2], //backZTetromino
        [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
        [0, 1, displayWidth, displayWidth + 1], //oTetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //iTetromino
    ];

    // display the shape in the mini-grid
    function displayShape() {
        // remove any trace of a tetromino from mini-grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino');
        });
        // draw new upcoming tetromino on mini-grid
        upNextTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino');
        });
    }

    // add functionlity to button
    startBtn.addEventListener('click', () => {
        if (timerId){
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            displayShape();
        }
    });

    // add score
    function addScore(){
        for (let i=0; i< 199; i += width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
            // add 10 to score
            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 10;
                scoreDisplay.innerHTML = score;
                // row removal
                row.forEach(index =>  {
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('tetromino');
                });
                // add new rows to top of grid
                const squaresRemoved = squares.splice(i, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));
            }
        }
    }

    // game over
    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            scoreDisplay.innerHTML = 'Game over';
            clearInterval(timerId);
        }
    }
});

