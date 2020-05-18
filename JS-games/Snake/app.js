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

    //set keycodes for snake movement

});
