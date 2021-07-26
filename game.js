let playerScore = 0;
let computerScore = 0;

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

    const gameBtns = document.querySelectorAll('.game-btns')
    gameBtns.forEach((btn) => {
        btn.style.display = "inline-block";
    })
}

const gameBtns = document.querySelectorAll('.game-btns');
gameBtns.forEach((btn) => {
    let output = btn.addEventListener('click', playGame);
});


function playGame(e) {
    const btnEvt = e;
    const playTo = 5;

    playRound(btnEvt.srcElement.id) === 1? playerScore += 1: computerScore += 1;

    if(playerScore < playTo && computerScore < playTo){
        showScoreDiv(playerScore, computerScore);
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
    if(!document.querySelector('#round-div')){
        const body = document.querySelector('body');

        const div = document.createElement('div');
        div.id = 'round-div';

        const roundTxt = document.createElement('p')
        roundTxt.id = 'round-txt';
        roundTxt.textContent = message;

        div.appendChild(roundTxt);
        body.appendChild(div);
    }
    else{
        const roundTxt = document.querySelector('#round-txt');
        roundTxt.textContent = message;
    }
}

function showScoreDiv(player, computer){
    let message = `Player: ${player} Computer: ${computer}`
    if(!document.querySelector('#score-div')){
        const body = document.querySelector('body');
        const btnDiv = document.querySelector('#button-div')

        const div = document.createElement('div');
        div.id = 'score-div'

        const title = document.createElement('h3');
        title.id = 'score-title';
        title.textContent = "Current score";
        
        const para = document.createElement('p');
        para.id = 'score';
        para.textContent = message;

        div.appendChild(title);
        div.appendChild(para);
        body.insertBefore(div, btnDiv);
    }
    else{
        const para = document.querySelector('#score');
        para.textContent = message;
    }
}

function endGame() {
    let message = '';
    if(playerScore > computerScore) {
        message = `Congratulations! You beat the computer ${playerScore}-${computerScore}!`;
    }
    else {
        message = `Sorry! The computer beat you ${computerScore}-${playerScore}. Try Again!`;
    }

    const body = document.querySelector('body');
    const scoreDiv = document.querySelector('#score-div');
    const scoreDivChildren = scoreDiv.childNodes;
    [...scoreDivChildren].forEach(child => {
        child.remove();
    })

    const endMessage = document.createElement('h2');
    endMessage.textContent = message;
    scoreDiv.appendChild(endMessage);
    

    const gameBtns = document.querySelectorAll('.game-btns')
    gameBtns.forEach((btn) => {
        btn.style.display = "none";
    })

    const start = document.querySelector('#start-btn');
    start.textContent = "Play Again?";
    start.style.display = 'inline-block';

    const roundDiv = document.querySelector('#round-div');
    roundDiv.remove();
}

function resetGame(){
    playerScore = 0;
    computerScore = 0;
    const scoreDiv = document.querySelector('#score-div');
    scoreDiv.remove();
}