// Getting all controls
const controls = document.querySelectorAll(".btn-control");
// Setting a victory map of who will win in each use case
const victoryMap = new Map([["rock", "scissors"], ["paper", "rock"], ["scissors", "paper"]]);
// Setting my bot's options
const options = new Map([["rock", "✊"], ["paper", "✋"], ["scissors", "✌"]]);
const optionsArr = ["rock", "paper", "scissors"];
// Getting the match result div
let scoreMap = new Map([["player", 0], ["robot", 0]]);



//Getting a random int in range
function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Resetting the score
function resetScore() {
    scoreMap.forEach((val, key) => scoreMap.set(key, 0));
    updateScore(scoreMap);
    updateWinner("");
}

// setting user controls even listeners
function getUserControls() {
    const userControls = document.querySelectorAll(".user-controls>.btn-control");
    userControls.forEach((button) => {
        button.addEventListener("click", game);
    });
}

// ~~~~~~~~Game~~~~~~~~~

// Countdown

function countdown(duration, msPerIter) {
    return new Promise(resolve => {
        console.log("Hi");

        let countdown = document.getElementById("countdown");
        countdown.innerText = `${duration}`;
        countdown.style.display = "block";
        let id = setInterval(() => {
            if (duration = 0) {
                countdown.style.display = "none";
                clearInterval(id);
                resolve();
            } else {
                countdown.innerText = `${duration}`;
                duration--;
            }
        }, msPerIter);
    });
}
// Updating scores
function updateScore(scoreMap) {
    const scores = document.getElementById("totalScore");
    let scoresText = "";
    scoreMap.forEach((val, key) => {
        scoresText += `${key}: ${val} - `;
    });
    scores.innerText = scoresText.slice(0, scoresText.length - 2);
    localStorage.setItem("scoreMap", JSON.stringify([...scoreMap]));
}

// Choosing for robot
function setRobotChoice() {
    const robotChoice = document.getElementById("robotChoice");
    const choice = optionsArr[randomInRange(0, 2)];
    robotChoice.innerText = options.get(choice);
    return choice;
}

// Displaying user's choice
function setUserPlay(choice) {
    let userChoice = document.getElementById("userChoice");
    userChoice.innerText = options.get(choice);

}
// game course
async function game(event) {
    console.log("object");
    await countdown(3, 800);
    let userChoice = event.currentTarget.value;
    setUserPlay(userChoice);
    let robotChoice = setRobotChoice();
    let winner = getWinner(userChoice, robotChoice);
    updateWinner(winner);
    updateScore(scoreMap);
}

// displaying winner
function updateWinner(winner) {
    let winnerDiv = document.getElementById("winner");
    winnerDiv.classList = "";
    winnerDiv.classList.add("animate");
    winnerDiv.innerText = winner;
    setTimeout(() => {
        winnerDiv.classList.remove("animate");
    }, 500);

}
// checking who won
function getWinner(userChoice, robotChoice) {
    if (robotChoice === userChoice) {
        return "It's a draw!";
    } else if (victoryMap.get(userChoice) === robotChoice) {
        scoreMap.set("player", scoreMap.get("player") + 1);
        return "You win!";
    } else {
        scoreMap.set("robot", scoreMap.get("robot") + 1);
        return "You lose! Robot wins!";
    }
}


// storage support
function setScoreMap() {
    if (localStorage.getItem("scoreMap") === null) {
        localStorage.setItem("scoreMap", JSON.stringify([...scoreMap]));
    } else {
        scoreMap = new Map(JSON.parse(localStorage.getItem("scoreMap")));
        updateScore(scoreMap);
    }
}

function setResetButton() {
    let resetButton = document.querySelector(".btn-reset");
    resetButton.addEventListener("click", resetScore);
}


// initializing the game
function init() {
    setScoreMap();
    getUserControls();
    setResetButton();
}

document.body.onload = init();