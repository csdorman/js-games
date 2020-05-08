document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    const squares = document.querySelectorAll('.grid div');
    const result = document.querySelector('#result');
    const displayCurrentPlayer = document.querySelector('#current-player');
    let currentPlayer = 1;
    console.log("Current player is " + currentPlayer);

    //display player 1 on load
    displayCurrentPlayer.innerHTML = currentPlayer;
    // loop through each squares
    for (var i = 0, len = squares.length; i < len; i++) {
        // add onclick to each squares
       
    (function(index){
        squares[i].onclick = function(){
            //if squares below selected squares(+ 7 in div row) is taken, space is valid
            if(squares[index + 7].classList.contains('taken')){
                //if current player is player-one
                if (currentPlayer === 1) {
                    // add class 'taken' and 'player-one' to selected squares
                    squares[index].classList.add('taken');
                    squares[index].classList.add('player-one');
                    // change the player
                    currentPlayer = 2;
                    displayCurrentPlayer.innerHTML = currentPlayer;
                // if current player is player-two
                } else if (currentPlayer === 2) {
                    // add class 'taken' and 'player-two' to selected squares
                    squares[index].classList.add('taken');
                    squares[index].classList.add('player-two');
                    // change the player
                    currentPlayer = 1;
                    displayCurrentPlayer.innerHTML = currentPlayer;
                };
            } else  alert('This is not a valid space!');
        };
    })(i);
    }


    
});
