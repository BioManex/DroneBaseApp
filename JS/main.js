let armButton = document.getElementById('arm-button');
let armButtonText = document.getElementById('arm-button-text');
let missionTimer = document.getElementById('mission-timer');

let timerControl = document.getElementById('timer-control');
let timerControlText = document.getElementById('timer-control-text');
let timerIcon = document.getElementById('timer-icon');
let runTimer = true;
let timer = 0;

let payloadUpButton = document.getElementById('payload-up');
let payloadStopButton = document.getElementById('payload-stop');
let payloadDownButton = document.getElementById('payload-down');

let modeTile = document.getElementById('mode-tile');
let modeIcon = document.getElementById('mode-icon');
let modeText = document.getElementById('flight-mode');

let eStopButton = document.getElementById('e-stop');

armButton.addEventListener('click', function(){
    if(armButton.classList.contains('arm-button')) {
        armButton.classList.remove('arm-button');
        armButton.classList.add('disarm-button');
        armButtonText.textContent = "ARMED";
        logToConsole('Armed Drone');
    }else{
        armButton.classList.add('arm-button');
        armButton.classList.remove('disarm-button');
        armButtonText.textContent = "DISARMED";
        logToConsole('Disarmed Drone');
    }
});

timerControl.addEventListener('click', function(){
    runTimer = !runTimer;
    timerIcon.classList.toggle('play');
    timerIcon.classList.toggle('pause');
    if(runTimer){
        timerControlText.textContent = "PAUSE"
    }else{
        timerControlText.textContent = "START"
    }
});

payloadUpButton.addEventListener('click', function(){
    payloadUpButton.classList.add('active-button');
    payloadDownButton.classList.remove('active-button');
    payloadStopButton.classList.remove('active-button');
    payloadUpButton.classList.add('inactive-button');
    payloadDownButton.classList.add('inactive-button');
    payloadStopButton.classList.add('inactive-button');
});
payloadStopButton.addEventListener('click', function(){
    payloadUpButton.classList.remove('active-button');
    payloadDownButton.classList.remove('active-button');
    payloadStopButton.classList.add('active-button');
    payloadUpButton.classList.add('inactive-button');
    payloadDownButton.classList.add('inactive-button');
    payloadStopButton.classList.remove('inactive-button');
});
payloadDownButton.addEventListener('click', function(){
    payloadUpButton.classList.remove('active-button');
    payloadDownButton.classList.add('active-button');
    payloadStopButton.classList.remove('active-button');
    payloadUpButton.classList.add('inactive-button');
    payloadDownButton.classList.remove('inactive-button');
    payloadStopButton.classList.add('inactive-button');
});

eStopButton.addEventListener('click', function(){
    modeTile.classList.add('e-stop-tile-style');
    modeIcon.classList.add('e-stop-style');
    modeText.textContent = 'E-STOP';
    logToConsole("E-STOP ENGAGED", "error");
});

function convertTimerToFormated() {
    if(!runTimer) return;

    timer++;
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = seconds.toString().padStart(2, '0');

    missionTimer.textContent = `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

function logToConsole(message, level = 'info'){
    const output = document.getElementById('console');
    if(!output) return;

    const line = document.createElement('div');
    line.className = `console-line ${level}`;

    const timeStamp = new Date().toLocaleTimeString();
    const tag = level.toUpperCase().padEnd(7, ' ');

    line.innerText = `[${timeStamp}] [${level.toUpperCase()}] ${message}`;
    output.appendChild(line);

    output.scrollTop = output.scrollHeight;
}

const appConsole = document.querySelector('.console-output');
const startingHeight = appConsole.offsetHeight; 
appConsole.style.maxHeight = `${startingHeight}px`;

setInterval(convertTimerToFormated, 1000);

