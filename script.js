const timerDisplay = document.querySelector('.timer');
const startButton = document.querySelector('.buttons button:nth-child(1)');
const pauseButton = document.querySelector('.buttons button:nth-child(2)');
const resetButton = document.querySelector('.buttons button:nth-child(3)');
const modeToggle = document.querySelector('#mode-toggle');
const modeLabel = document.querySelector('.mode label');
const statusText = document.querySelector('.status');

let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isWorkMode = true;

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                alert(isWorkMode ? 'Work session complete! Take a break!' : 'Break time is over! Back to work!');
                timeLeft = isWorkMode ? BREAK_TIME : WORK_TIME;
                isWorkMode = !isWorkMode;
                updateDisplay();
                updateModeLabel();
                updateStatus();
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = WORK_TIME;
    isWorkMode = true;
    modeToggle.checked = false;
    updateDisplay();
    updateModeLabel();
    updateStatus();
}

function updateModeLabel() {
    if (modeToggle.checked) {
        modeLabel.textContent = 'Time to chill 🦥';
        timeLeft = BREAK_TIME;
    } else {
        modeLabel.textContent = 'Time to focus 🐝';
        timeLeft = WORK_TIME;
    }
    updateDisplay();
}

function updateStatus() {
    statusText.textContent = isWorkMode ? 'Work Time' : 'Break Time';
}

function toggleMode() {
    updateModeLabel();
}

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
modeToggle.addEventListener('change', toggleMode);

// Initialize display
updateDisplay();
updateModeLabel();
updateStatus(); 