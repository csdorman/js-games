document.addEventListener('DOMContentLoaded', () => {
    const square = document.querySelectorAll('.grid div');
    const result = document.querySelector('#result');
    const displayCurrentPlayer = document.querySelector('#current-player');
    let currentPlayer = 1;
    console.log("Current player is " + currentPlayer);

    //display player 1 on load
    displayCurrentPlayer.innerHTML = currentPlayer;
    // loop through each square
    for (var i = 0, len = square.length; i < len; i++); {
        // add onclick to each square
        //Attempting to try and get clicks to work ANYWHERE!
        document.getElementByClass('square').onclick = function notify(){
            alert('Page click detected');   
        }
        // End click testing attempt
        (function(index){
            square[i].onclick = function() {
                //if square below selected square(+ 7 in div row) is taken, space is valid
                if (square[i+7].classList.contains('taken')){
                    //if current player is player-one
                    if (currentPlayer === 1) {
                        // add class 'taken' and 'player-one' to selected square
                        square[index].classList.add('taken');
                        square[index].classList.add('player-one');
                        // change the player
                        currentPlayer = 2;
                        displayCurrentPlayer.innerHTML = currentPlayer;
                    // if current player is player-two
                    } else if (currentPlayer === 2) {
                        // add class 'taken' and 'player-two' to selected square
                        square[index].classList.add('taken');
                        square[index].classList.add('player-two');
                        // change the player
                        currentPlayer = 1;
                        displayCurrentPlayer.innerHTML = currentPlayer;
                    };
                } else {
                    alert('This is not a valid space!');
                };
            };
        });
    };


    
});
