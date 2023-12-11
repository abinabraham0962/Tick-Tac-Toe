const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleClick = (index) => {
    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        endGame(winner);
    } else if (checkDraw()) {
        endGame(null);
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return null;
};

const checkDraw = () => {
    return gameBoard.every((cell) => cell !== "");
};

const endGame = (result) => {
    gameActive = false;
    winningMessageTextElement.textContent = result ? `${result} wins!` : "It's a draw!";
    winningMessageElement.style.display = "flex";
};

const restartGame = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    winningMessageElement.style.display = "none";

    // Reset the text content of each cell to an empty string
    cells.forEach((cell) => {
        cell.textContent = "";
    });
};


cells.forEach((cell, index) =>{
    cell.addEventListener("click", () => handleClick(index));
});

restartButton.addEventListener("click", restartGame);