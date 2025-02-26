const timerDisplay = document.querySelector('.timer');
const startPauseButton = document.querySelector('#startPauseBtn');
const resetButton = document.querySelector('.buttons button:nth-child(2)');
const modeToggle = document.querySelector('#mode-toggle');
const modeLabel = document.querySelector('.mode label');
const statusText = document.querySelector('.status');

let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isWorkMode = true;

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

let isPageVisible = true;
let lastTimestamp = Date.now();

// Add visibility change detection
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        isPageVisible = false;
    } else {
        isPageVisible = true;
        if (timerId !== null) {
            lastTimestamp = Date.now();
        }
    }
});

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update both the timer display and document title
    timerDisplay.textContent = timeString;
    document.title = `${timeString} - Pomodoro Timer`;
}

function startTimer() {
    if (timerId === null) {
        lastTimestamp = Date.now();
        timerId = setInterval(() => {
            if (isPageVisible) {
                const currentTime = Date.now();
                const deltaTime = Math.floor((currentTime - lastTimestamp) / 1000);
                lastTimestamp = currentTime;
                
                // Decrease time by actual elapsed seconds
                timeLeft = Math.max(0, timeLeft - deltaTime);
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

function toggleStartPause() {
    if (timerId === null) {
        startTimer();
        startPauseButton.textContent = 'Pause';
    } else {
        pauseTimer();
        startPauseButton.textContent = 'Start';
    }
}

// Event listeners
startPauseButton.addEventListener('click', toggleStartPause);
resetButton.addEventListener('click', resetTimer);
modeToggle.addEventListener('change', toggleMode);

// Initialize display
updateDisplay();
updateModeLabel();
updateStatus(); 