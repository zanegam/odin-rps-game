function playRound(){
    let winner = null

    while(winner===null){
        playerSelection = playerInput();
        console.log(playerSelection);

        computerSelection = computerPlay();
        console.log(computerSelection);

        winner = findWinner(playerSelection, computerSelection);
        roundOutput(winner, playerSelection, computerSelection);
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

function playerInput() {
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

function findWinner(player, computer){
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

function roundOutput(winner, player, computer){
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