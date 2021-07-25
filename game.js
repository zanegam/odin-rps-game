function playGame() {
    let playerScore = 0;
    let computerScore = 0;

    while(playerScore < 5 && computerScore < 5){
        playRound() === 1? playerScore += 1: computerScore += 1;
        showScoreDiv(playerScore, computerScore);
    }
    
    if(playerScore > computerScore) {
        alert(`Congratulations! You beat the computer ${playerScore}-${computerScore}!`);
    }
    else {
        alert(`Sorry! The computer beat you ${computerScore}-${playerScore}. Try Again!`);
    }
}

function playRound() {
    let winner = null

    while(winner===null) {
        playerSelection = getPlayerInput();

        computerSelection = computerPlay();

        winner = getWinner(playerSelection, computerSelection);
        displayRoundOutput(winner, playerSelection, computerSelection);
    }
    return winner;
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

function getPlayerInput() {
    let valid = false;
    while(valid === false) {
        let selection = prompt("Please select Rock, Paper, or Scissors:")
        switch(selection.toLowerCase()){
            case "rock":
                valid = true;
                return "Rock";
            case "paper":
                valid = true;
                return "Paper";
            case "scissors":
                valid = true;
                return "Scissors";
            default:
                alert("Invalid Entry");
        }
    }
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

    const div = document.createElement('div');
    div.id = 'score-div'

    const para = document.createElement('p');
    para.id = 'score';
    para.whiteSpace = 'pre-line';
    para.textContent = message;
    console.log(para);

    div.appendChild(para);
    body.appendChild(div);
    }
    else{
        const para = document.querySelector('#score');
        para.textContent = message;
    }
}