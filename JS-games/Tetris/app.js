document.addEventListener('DOMContentLoaded', () => {
    // define the grid as the html div
    const grid = document.querySelector('.grid');
    // create an array from all the html divs in .grid
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    // define the width of the board
    const width = 10;

    // The Tetromino shapes
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 +2],
        [1, width +1, width * 2, width * 2 +1],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];
    const zTetromino = [
        [width * 2, width + 1, width * 2 + 1, width + 2],
        [0, width, width + 1, width * 2 + 1],
        [width * 2, width + 1, width * 2 + 1, width + 2],
        [0, width, width + 1, width * 2 + 1]
    ];
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
    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

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

    //move tetromino 1/second
    timerId = setInterval(moveDown, 1000);

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
            random = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
        };
    }

});

