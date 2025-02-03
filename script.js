const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector("#newGameBtn");
const musicToggleButton = document.getElementById('musicToggle');


let music = new Audio("assets/music.mp3");
music.loop = true; 
music.volume = 0.5; 

let audioTurn = new Audio("assets/ting.mp3");
let gameover = new Audio("assets/gameover.mp3");
gameover.volume = 0.5; 


let isMusicOn = true;


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


function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index + 1}`;
    });
    
    document.querySelector(".imgbox").style.display = "none"; 

    newGameBtn.style.display = "none"; 
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


initGame();

function swapTurn() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {
                answer = gameGrid[position[0]]; 
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none"; 
                });
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");

                document.querySelector(".imgbox").style.display = "block"; 
            }
    });

    if(answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.style.display = "inline-block"; 
        gameover.play();
        return;
    }

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" ) fillCount++;
    });

    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.style.display = "inline-block"; 
    }
}

function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        audioTurn.play(); 
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);


function startGame() {
    if (isMusicOn && music.paused) {
        music.play(); 
    }
}


musicToggleButton.addEventListener('click', () => {
    if (isMusicOn) {
        music.pause(); 
        musicToggleButton.innerText = "Turn Music On";
    } else {
        music.play(); 
        musicToggleButton.innerText = "Turn Music Off";
    }
    isMusicOn = !isMusicOn; 
});


startGame();
