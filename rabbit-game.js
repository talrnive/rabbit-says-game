document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start");
    if (startButton) {
        startButton.addEventListener("click", startGame);
    }
});

const actions = ["לקפוץ במקום", "לנענע את האף", "לשקשק זנב", "להרים אוזניים"];
let sequence = [];
let playerSequence = [];
let round = 0;
let gameOver = false;

const message = document.getElementById("message");
const counter = document.getElementById("counter");
const startButton = document.getElementById("start");

function getRandomAction() {
    return actions[Math.floor(Math.random() * actions.length)];
}

function playSequence() {
    message.textContent = "שימו לב לתנועות הארנב!";
    let i = 0;
    const interval = setInterval(() => {
        if (i >= sequence.length) {
            clearInterval(interval);
            message.textContent = "עכשיו תורך! חזרו על התנועות לפי הסדר.";
            return;
        }
        highlightButton(sequence[i]);
        i++;
    }, 1000);
}

function highlightButton(action) {
    document.querySelectorAll(".button").forEach(button => {
        if (button.dataset.action === action) {
            button.style.backgroundColor = button.dataset.color;
            setTimeout(() => {
                button.style.backgroundColor = "white";
            }, 500);
        }
    });
}

function startGame() {
    startButton.style.display = "none";
    sequence = [];
    playerSequence = [];
    round = 0;
    gameOver = false;
    updateCounter();
    nextRound();
}

function nextRound() {
    if (gameOver) return;
    round++;
    updateCounter();
    playerSequence = [];
    sequence.push(getRandomAction());
    playSequence();
}

function updateCounter() {
    counter.textContent = `שלב: ${round}`;
}

function buttonClick(button) {
    if (gameOver) return;
    button.style.backgroundColor = button.dataset.color;
    setTimeout(() => {
        button.style.backgroundColor = "white";
    }, 500);
    playerSequence.push(button.dataset.action);
    if (!checkPlayerSequence()) {
        message.textContent = "טעיתם! נסו שוב.";
        startButton.style.display = "block";
        startButton.style.margin = "20px auto";
        round = 0;
        updateCounter();
        gameOver = true;
        return;
    }
    if (playerSequence.length === sequence.length) {
        message.textContent = "כל הכבוד! לשלב הבא!";
        setTimeout(nextRound, 1000);
    }
}

function checkPlayerSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== sequence[i]) {
            return false;
        }
    }
    return true;
}

// Attach event listeners to buttons
document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", function() {
        buttonClick(this);
    });
});
