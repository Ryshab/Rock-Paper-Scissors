
let score = {
    wins: 0,
    losses: 0,
    ties: 0
};

update_score();

// Function to generate computer's move
function generatemove() {
    const ran = Math.random();
    if (ran < 1 / 3) return 'rock';
    else if (ran < 2 / 3) return 'paper';
    return 'scissors';
}

let isAutoPlaying = false;
let intervalID;

function autoPlay(){
    if (!isAutoPlaying) {
        intervalID = setInterval ( function (){
            const playerMove = generatemove();
            playGame(playerMove);
        }, 2000);
        isAutoPlaying = true;
    }
    else{
        clearInterval (intervalID);
        isAutoPlaying = false;
    }
}

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r'){
        playGame('rock');
    }
    else if(event.key === 'p'){
        playGame('paper');
    }
    else if (event.key === 's'){
        playGame('scissors');
    }
})

// Function to play the game
function playGame(playerMove) {
    const computerMove = generatemove();
    let result = '';

    if (playerMove === computerMove) {
        result = 'Tie';
        score.ties++;
    } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ) {
        result = 'You win';
        score.wins++;
    } else {
        result = 'You lose';
        score.losses++;
    }

    // Update localStorage
    localStorage.setItem('Score', JSON.stringify(score));

    update_score();

    result_up(result);
    move_display(computerMove, playerMove);

}
score = JSON.parse(localStorage.getItem('Score')) || { wins: 0, losses: 0, ties: 0 };


function update_score() {
    document.querySelector('.Score-Display').innerHTML = `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;
}

function result_up(a) {
    document.querySelector('.result_update').innerHTML = a;
}

function move_display(b, c) {
    document.querySelector('.move-display').innerHTML =` You <img src="images/${c}-emoji.png" class="move-icon">
<img src="images/${b}-emoji.png" class="move-icon" > Computer`;
}

