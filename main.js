let armButton = document.getElementById('arm-button');
let armButtonText = document.getElementById('arm-button-text');
let missionTimer = document.getElementById('mission-timer');

let timerControl = document.getElementById('timer-control');
let timerControlText = document.getElementById('timer-control-text');
let timerIcon = document.getElementById('timer-icon');
let runTimer = true;
let timer = 0;


armButton.addEventListener('click', function(){
    if(armButton.classList.contains('arm-button')) {
        armButton.classList.remove('arm-button');
        armButton.classList.add('disarm-button');
        armButtonText.textContent = "ARMED";
        console.log('Armed Drone')
    }else{
        armButton.classList.add('arm-button');
        armButton.classList.remove('disarm-button');
        armButtonText.textContent = "DISARMED";
        console.log('Disarmed Drone')
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
})

function convertTimerToFormated() {
    if(runTimer){
        timer++;
    }
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = seconds.toString().padStart(2, '0');

    missionTimer.textContent = `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

setInterval(convertTimerToFormated, 1000);

