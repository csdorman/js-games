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
    // Use guide at 35:10 to create these arrays
    const zTetromino = [];
    const tTetromino = [];
    const oTetromino = [];
    const iTetromino = [];
    // Resume video at 37:45 after arrays are done
});

