let startTime;
let updatedTime;
let difference = 0;
let timerInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
    let milliseconds = parseInt((ms % 1000) / 10);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        timerInterval = setInterval(() => {
            updatedTime = new Date().getTime();
            difference = updatedTime - startTime;
            display.innerHTML = formatTime(difference);
        }, 10);
        running = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
        lapButton.disabled = false;
        resetButton.disabled = false;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00.00";
    lapsList.innerHTML = "";
    lapCounter = 0;
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = formatTime(difference);
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(lapElement);
    }
}

// Initial button states
pauseButton.disabled = true;
resetButton.disabled = true;
lapButton.disabled = true;

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
