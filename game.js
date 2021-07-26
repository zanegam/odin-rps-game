const startBtn = document.querySelector('#start-btn')
startBtn.addEventListener('click', () =>{
    showGameButtons();
})

function showGameButtons(){
    const start = document.querySelector('#start-btn');
    start.remove();

    const btnDiv = document.querySelector('#button-div');

    const rock = document.createElement('button');
    rock.textContent = 'Rock';
    rock.id = 'rock';
    rock.classList.add('game-btn');
    btnDiv.append(rock);

    const paper = document.createElement('button');
    paper.textContent = 'Paper';
    paper.id = 'paper';
    paper.classList.add('game-btn');
    btnDiv.append(paper);

    const scissors = document.createElement('button');
    scissors.textContent = 'Scissors';
    scissors.id = 'scissors';
    scissors.classList.add('game-btn');
    btnDiv.append(scissors);

    const gameBtns = document.querySelectorAll('button');
    gameBtns.forEach((btn) => {
    btn.addEventListener('click', playGame);
    });
}

function playGame(e) {
    const btnEvt = e;
    let playerScore = 0;
    let computerScore = 0;

    if(playerScore < 5 && computerScore < 5){
        playRound(btnEvt.srcElement.id) === 1? playerScore += 1: computerScore += 1;
        showScoreDiv(playerScore, computerScore);
    }
    else {
        if(playerScore > computerScore) {
            //alert(`Congratulations! You beat the computer ${playerScore}-${computerScore}!`);
        }
        else {
            //alert(`Sorry! The computer beat you ${computerScore}-${playerScore}. Try Again!`);
        }
    }
}

function playRound(btnID) {
    let winner = null
    while(winner===null) {
        playerSelection = getPlayerInput(btnID);

        computerSelection = computerPlay();

        winner = getWinner(playerSelection, computerSelection);
        //displayRoundOutput(winner, playerSelection, computerSelection);
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
    switch(winner){
        case 1:
            alert(`Congratulations, you win! ${player} beats ${computer}.`);
            break;
        case 0:
            alert(`Sorry, you lose. ${computer} beats ${player}.`);
            break;
        default:
            alert(`Tie game! You both chose ${player}. Try again!`)
    }
}

function showScoreDiv(player, computer){
    let message = `Current score\nPlayer: ${player} Computer: ${computer}`
    if(!document.querySelector('#score-div')){
    const body = document.querySelector('body');
    const btnDiv = document.querySelector('#button-div')

    const div = document.createElement('div');
    div.id = 'score-div'

    const para = document.createElement('p');
    para.id = 'score';
    para.whiteSpace = 'pre-line';
    para.textContent = message;
    console.log(para);

    div.appendChild(para);
    body.insertBefore(div, btnDiv);
    }
    else{
        const para = document.querySelector('#score');
        para.textContent = message;
    }
}

