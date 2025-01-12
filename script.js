let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isWorkTime = true;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.querySelector('.timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function toggleTimer() {
    const button = document.getElementById('startPauseButton');
    
    if (timerId === null) {
        // Start the timer
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                button.textContent = 'Start';
                
                // Switch between work and break
                isWorkTime = !isWorkTime;
                timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
                updateModeDisplay();
                updateDisplay();
                alert(isWorkTime ? 'Break is over! Time to work!' : 'Work is over! Time for a break!');
            }
        }, 1000);
        button.textContent = 'Pause';
    } else {
        // Pause the timer
        clearInterval(timerId);
        timerId = null;
        button.textContent = 'Start';
    }
}

function resetTimer() {
    const button = document.getElementById('startPauseButton');
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = 25 * 60;
    button.textContent = 'Start';
    updateModeDisplay();
    updateDisplay();
}

function updateModeDisplay() {
    const modeText = document.querySelector('.mode');
    const modeToggle = document.querySelector('.mode-toggle i');
    
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    modeToggle.className = isWorkTime ? 'fas fa-coffee' : 'fas fa-briefcase';
    modeToggle.parentElement.className = `mode-toggle ${isWorkTime ? 'work' : 'break'}`;
}

function toggleMode() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
    
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    updateModeDisplay();
    updateDisplay();
}

// Initialize the toggle button
document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.querySelector('.mode-toggle');
    modeToggle.addEventListener('click', toggleMode);
    updateModeDisplay();
}); 