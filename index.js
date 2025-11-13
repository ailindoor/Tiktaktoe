let playerO = 'O';
let playerX = 'X';

let currPlayer = playerO;

/*                0    1   2  3  4   5  6  7  8   */
let gameBoard = ['', '', '', '', '', '', '', '', '', ''];

let gameCells;

let winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
]

let gameOver = false;

let restartGameButton;

window.onload = function () {
    gameCells = document.getElementsByClassName('gameCell');
    for (let cell of gameCells) {
        cell.addEventListener('click', placeCell);
    }
    restartGameButton = document.getElementById('restartGameButton');
    restartGameButton.addEventListener('click', restartGame);
}

function placeCell() {

    if (gameOver) {
        return;
    }

    //llamamos el atributo de las celdas
    const index = parseInt(this.getAttribute('data-index'));

    //agregamos los indices que estan en las celdas al array gameboard
    if (gameBoard[index] != '') {
        return;
    }

    //actualizamos el jugador por cada click
    this.innerText = currPlayer;
    //actulizamos el jugador por el indice que se agrega al array
    gameBoard[index] = currPlayer;


    //verificamos si el jugador O ya tomos su turno
    currPlayer = (currPlayer == playerO) ? playerX : playerO;

    //verificar el ganador
    checkWinner();
}

function checkWinner() {
    for (let winCondition of winningCondition) {
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];

        if (a == b && b == c && a != '') {
            //actualizar el estilo
            for (let i = 0; i < gameBoard.length; i++) {
                if (winCondition.includes(i)) {
                    gameCells[i].classList.add('winningGameCell');
                }
            }
            gameOver = true;
            return;
        }
    }
}

function restartGame (){
    gameOver = false;
    gameBoard = ['', '', '', '', '', '', '', '', '', ''];

    for (let cell of gameCells){
        cell.innerText = '';
        cell.classList.remove('winningGameCell');
    }
}