class Score {
    constructor () {
        this.player = 0;
        this.computer = 0;
    }

    get playerScore() {
        return this.player;
    }

    get computerScore() {
        return this.computer;
    }

    addPlayerScore() {
        this.player += 1;
    }

    addComputerScore() {
        this.computer += 1;
    }
}

const playTo = 5;
let score = new Score();

const startBtn = document.querySelector('#start-btn')
startBtn.addEventListener('click', () =>{
    showGameButtons();
})

function showGameButtons(){
    const start = document.querySelector('#start-btn');
    start.style.display = "none";
    if(start.textContent === "Play Again?"){
        resetGame();
    }
    else {
        showGameHeader();
    }
    const initBtns = document.querySelectorAll('.init-btns')
    initBtns.forEach((btn) => {
        btn.style.display = "none";
    })

    const gameBtns = document.querySelectorAll('.game-btns')
    gameBtns.forEach((btn) => {
        btn.style.display = "inline-block";
    })
}

function showGameHeader() {
    header = document.querySelector('#header-div')
    headerH1 = document.querySelector('#header-h1');
    
    headerH1.textContent = "Rock, Paper, or Scissors"
    
    headerH2 = document.createElement('h2');
    headerH2.textContent = 'Choose wisely...';

    header.appendChild(headerH2);
}

const gameBtns = document.querySelectorAll('.game-btns');
gameBtns.forEach((btn) => {
    let output = btn.addEventListener('click', playGame);
});


function playGame(e) {
    const btnEvt = e;

    playRound(btnEvt.srcElement.id) === 1? score.addPlayerScore(): score.addComputerScore();

    if(score.playerScore < playTo && score.computerScore < playTo){
        showScoreDiv(score.playerScore, score.computerScore);
    }
    else {
        endGame();
    }
}

function playRound(btnID) {
    let winner = null
    while(winner===null) {
        playerSelection = getPlayerInput(btnID);

        computerSelection = computerPlay();

        winner = getWinner(playerSelection, computerSelection);
        displayRoundOutput(winner, playerSelection, computerSelection);
    }
    return winner;
}

function getPlayerInput(selection) {
    switch(selection){
        case "rock":
            valid = true;
            return "Rock";
        case "paper":
            valid = true;
            return "Paper";
        case "scissors":
            valid = true;
            return "Scissors";
    }
}

function computerPlay() {
    let selection = getRandomInt(1, 3);
    switch(selection) {
        case 1:
            return "Rock";
        case 2:
            return "Paper";
        case 3:
            return "Scissors";
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getWinner(player, computer){
    if(player === computer) {return null}
    switch(player){
        case "Rock":
            return (computer === "Scissors"? 1: 0);
        case "Paper":
            return (computer === "Rock"? 1: 0);
        case "Scissors":
            return (computer === "Paper"? 1: 0);
    }
}

function displayRoundOutput(winner, player, computer){
    let message = '';
    switch(winner){
        case 1:
            message = `Congratulations, you win! ${player} beats ${computer}.`;
            break;
        case 0:
            message = `Sorry, you lose. ${computer} beats ${player}.`;
            break;
        default:
            message = `Tie game! You both chose ${player}. Try again!`;
    }
    const roundTxt = document.querySelector('#round-msg');
    roundTxt.textContent = message;

}

function showScoreDiv(player, computer){
    let message = `Player: ${player} Computer: ${computer}`
    // if(!document.querySelector('#score-div')){
    //     const body = document.querySelector('body');
    //     const btnDiv = document.querySelector('#button-div')

    //     const div = document.createElement('div');
    //     div.id = 'score-div'

    //     const title = document.createElement('h3');
    //     title.id = 'score-title';
    //     title.textContent = "Current score";
        
    //     const para = document.createElement('p');
    //     para.id = 'score';
    //     para.textContent = message;

    //     div.appendChild(title);
    //     div.appendChild(para);
    //     body.insertBefore(div, btnDiv);
    // }
    //else{
        const title = document.querySelector('#score-title');
        title.textContent = "Current Score";
        const para = document.querySelector('#score');
        para.textContent = message;
    //}
}

function endGame() {
    let message = '';
    if(score.playerScore > score.computerScore) {
        message = `Congratulations! You beat the computer ${score.playerScore}-${score.computerScore}!`;
    }
    else {
        message = `Sorry! The computer beat you ${score.computerScore}-${score.playerScore}. Try Again!`;
    }

    const body = document.querySelector('body');
    const scoreDiv = document.querySelector('#score-div');
    const scoreDivChildren = scoreDiv.childNodes;
    [...scoreDivChildren].forEach(child => {
        child.textContent = '';
    })

    const gameDiv = document.querySelector('#game-div');
    const divChild = gameDiv.firstChild;
    const endMessage = document.createElement('h2');
    endMessage.textContent = message;
    endMessage.id = 'end-message';
    gameDiv.insertBefore(endMessage, divChild);
    

    const gameBtns = document.querySelectorAll('.game-btns')
    gameBtns.forEach((btn) => {
        btn.style.display = "none";
    })

    const start = document.querySelector('#start-btn');
    start.textContent = "Play Again?";
    start.style.display = 'inline-block';
}

function resetGame(){
    score = new Score();
    // const scoreDiv = document.querySelector('#score-div');
    // scoreDiv.remove();
    const endMessage = document.querySelector('#end-message');
    endMessage.remove();
}