// Getting all controls
const controls = document.querySelectorAll(".btn-control");
// Setting a victory map of who will win in each use case
const victoryMap = new Map([["rock", "scissors"], ["paper", "rock"], ["scissors", "paper"]]);
// Setting my bot's options
const options = new Map([["rock", "✊"], ["paper", "✋"], ["scissors", "✌"]]);
// Getting the match result div
let scoreMap = new Map([["player", 0], ["robot", 0]]);
const userControls = document.querySelectorAll(".user-controls>.btn-control");


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
function setUserControls() {
    userControls.forEach((button) => {
        button.addEventListener("click", game);
    });
}

// ~~~~~~~~Game~~~~~~~~~

// Countdown

function countdown(duration, msPerIter) {

    return new Promise(resolve => {
        document.getElementById("winner").innerText = "";
        userControls.forEach((button) => {
            button.setAttribute("disabled", "true");
        });
        let countdown = document.getElementById("countdown");
        setRobotChoice("Nothing");
        setUserChoice("Nothing");
        countdown.style.display = "block";
        countdown.innerText = `${duration}`;
        let id = setInterval(() => {
            if (duration <= 1) {
                countdown.style.display = "none";
                resolve();
                clearInterval(id);
            } else {
                duration--;
                countdown.innerText = `${duration}`;
            }
        }, msPerIter);
    });
}
// Updating scores
function updateScore(scoreMap) {
    const playerScore = document.getElementById("playerScore");
    const robotScore = document.getElementById("robotScore");
    playerScore.innerText = `${scoreMap.get("player")}`;
    robotScore.innerText = `${scoreMap.get("robot")}`;
    sessionStorage.setItem("scoreMap", JSON.stringify([...scoreMap]));
}

// Choosing for robot
function getRobotChoice() {
    return [...options.keys()][randomInRange(0, 2)];
}
function setRobotChoice(choice) {
    const robotChoice = document.getElementById("robotChoice");
    if (options.has(choice)) {
        robotChoice.innerText = options.get(choice);
    } else {
        robotChoice.innerText = "?";
    }

}
// Displaying user's choice
function setUserChoice(choice) {
    let userChoice = document.getElementById("userChoice");
    if (options.has(choice)) {
        userChoice.innerText = options.get(choice);
    } else {
        userChoice.innerText = "?";
    }
}
// game course
async function game(event) {
    console.log(event);
    await countdown(3, 100);
    console.log(event);
    let userChoice = event.target.value;
    setUserChoice(userChoice);
    let robotChoice = getRobotChoice();
    setRobotChoice(robotChoice);
    let winner = getWinner(userChoice, robotChoice);
    updateWinner(winner);
    updateScore(scoreMap);
    userControls.forEach((button) => {
        button.removeAttribute("disabled");
    });
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
    if (sessionStorage.getItem("scoreMap") === null) {
        sessionStorage.setItem("scoreMap", JSON.stringify([...scoreMap]));
    } else {
        scoreMap = new Map(JSON.parse(sessionStorage.getItem("scoreMap")));
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
    setUserControls();
    setResetButton();
}

document.body.onload = init;
