// console.log("Welcome to Tic Tac Toe");

// let music = new Audio("assets/music.mp3");
// music.loop = true; // Make sure the background music loops continuously
// music.volume = 0.5; // Set background music volume to 50%
// let audioTurn = new Audio("assets/ting.mp3");
// let gameover = new Audio("assets/gameover.mp3");
// gameover.volume = 0.5; // Set gameover music volume to 50%
// let turn = "X";
// let isgameover = false;

// // Variable to track if music is on or off
// let isMusicOn = true; 

// // Function to change the turn
// const changeTurn = () => {
//     return turn === "X" ? "0" : "X";
// };

// // Function to check for a win
// const checkWin = () => {
//     let boxtext = document.getElementsByClassName('boxtext');
//     let wins = [
//         [0, 1, 2, 5, 5, 0],
//         [3, 4, 5, 5, 15, 0],
//         [6, 7, 8, 5, 25, 0],
//         [0, 3, 6, -5, 15, 90],
//         [1, 4, 7, 5, 15, 90],
//         [2, 5, 8, 15, 15, 90],
//         [0, 4, 8, 5, 15, 45],
//         [2, 4, 6, 5, 15, 135],
//     ];
//     wins.forEach((e) => {
//         if (
//             boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
//             boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
//             boxtext[e[0]].innerText !== ""
//         ) {
//             document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
//             isgameover = true;
//             document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
//             document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
//             document.querySelector(".line").style.width = "20vw";

//             // Play gameover music
//             gameover.play();
//         }
//     });
// };

// // Game Logic
// let startGame = () => {
//     if (isMusicOn && music.paused) {
//         music.play(); // Start music only if it's not already playing and music is on
//     }
// };

// // Initialize the game when the page is loaded
// startGame();

// // Add click listeners to the boxes
// let boxes = document.getElementsByClassName("box");
// Array.from(boxes).forEach((element) => {
//     let boxtext = element.querySelector('.boxtext');
//     element.addEventListener('click', () => {
//         if (boxtext.innerText === '' && !isgameover) {
//             boxtext.innerText = turn;
//             turn = changeTurn();
//             audioTurn.play();
//             checkWin();
//             if (!isgameover) {
//                 document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
//             }
//         }
//     });
// });

// // Add onclick listener to reset button
// let reset = document.querySelector('#reset'); // Ensure you have a reset button with id 'reset'
// reset.addEventListener('click', () => {
//     let boxtexts = document.querySelectorAll('.boxtext');
//     Array.from(boxtexts).forEach(element => {
//         element.innerText = "";
//     });
//     turn = "X";
//     isgameover = false;
//     document.querySelector(".line").style.width = "0vw";
//     document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
//     document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";

//     // Reset the game but don't stop the background music
//     gameover.pause();
//     gameover.currentTime = 0; // Reset the gameover sound to start fresh
// });

// // Toggle music on and off
// let musicToggleButton = document.getElementById('musicToggle');
// musicToggleButton.addEventListener('click', () => {
//     if (isMusicOn) {
//         music.pause(); // Pause music
//         musicToggleButton.innerText = "Turn Music On"; // Change button text
//     } else {
//         music.play(); // Resume music
//         musicToggleButton.innerText = "Turn Music Off"; // Change button text
//     }
//     isMusicOn = !isMusicOn; // Toggle music state
// });










const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector("#newGameBtn");
const musicToggleButton = document.getElementById('musicToggle');

// Initial music setup
let music = new Audio("assets/music.mp3");
music.loop = true; // Background music loops continuously
music.volume = 0.5; // Set background music volume to 50%

let audioTurn = new Audio("assets/ting.mp3");
let gameover = new Audio("assets/gameover.mp3");
gameover.volume = 0.5; // Set gameover music volume to 50%

// Variable to track if music is on or off
let isMusicOn = true;

// Initialize game variables
let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index + 1}`;
    });
    
    document.querySelector(".imgbox").style.display = "none"; // Hide the GIF when a new game starts

    newGameBtn.style.display = "none"; // Hide the New Game button initially
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Call the init function on game load
initGame();

// Swap turns between players X and O
function swapTurn() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Check for a winner or a tie
function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {
                answer = gameGrid[position[0]]; // Set the winner
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none"; // Disable clicks once game is over
                });
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");

                document.querySelector(".imgbox").style.display = "block"; // Show the GIF
            }
    });

    if(answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.style.display = "inline-block"; // Show the New Game button
        gameover.play(); // Play gameover music
        return;
    }

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" ) fillCount++;
    });

    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.style.display = "inline-block"; // Show the New Game button
    }
}

// Handle box click events
function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        audioTurn.play(); // Play turn sound
        swapTurn();
        checkGameOver();
    }
}

// Add event listeners to boxes
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

// Handle new game button click
newGameBtn.addEventListener("click", initGame);

// Start background music when the page loads
function startGame() {
    if (isMusicOn && music.paused) {
        music.play(); // Play background music if it's not already playing
    }
}

// Toggle music on and off
musicToggleButton.addEventListener('click', () => {
    if (isMusicOn) {
        music.pause(); // Pause music
        musicToggleButton.innerText = "Turn Music On";
    } else {
        music.play(); // Resume music
        musicToggleButton.innerText = "Turn Music Off";
    }
    isMusicOn = !isMusicOn; // Toggle music state
});

// Call startGame to ensure music starts when the page loads
startGame();
