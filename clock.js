const display = document.getElementById('clock');


// set audio for alarm
const audio = new Audio('https://nf1f8200-a.akamaihd.net/downloads/ringtones/files/mp3/ring2-mp3-6551.mp3');
audio.loop = true;


let alarmTime = null;
let alarmTimeout = null;


const myList = document.querySelector('#List');
const addAlarm = document.querySelector('.setAlarm')


const alarmList = [];  // Stores all the alarms being set 
// let count =1;


// Plays the alarm audio at correct time
function ringing(now) {
    audio.play();
    alert(`Hey! it is ${now}`)
}


// updates time every second 
function updateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const now = `${hour}:${minutes}:${seconds}`;

    display.innerText = `${hour}:${minutes}:${seconds}`;

    //     check if the alarmList includes the current time , "now"
    //     if yes, ringing() is called
    if (alarmList.includes(now)) {
        ringing(now);
    }
}


// set the correct format of time
// converts "1:2:3" to "01:02:03"
function formatTime(time) {
    if (time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}


// function to clear/stop the currently playing alarm
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}


// removes an alarm from the unordered list and the webpage when "Delete Alarm" is clicked
myList.addEventListener('click', e => {
    console.log("removing element")
    if (e.target.classList.contains("deleteAlarm")) {
        e.target.parentElement.remove();
    }
})


//when delete button clicks below code removes an Alarm from array
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                  // Clear contents
    alarmList.push.apply(alarmList, newList);

    console.log("newList", newList);
    console.log("alarmList", alarmList);
}


// Adds newAlarm to the unordered list as a new list item on webpage
//
function showNewAlarm(newAlarm) {
    const html = `
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    myList.innerHTML += html
};


//set an Alarm whenever the form is submitted
addAlarm.addEventListener('submit', e => {
    e.preventDefault();
    let new_h = formatTime(addAlarm.a_hour.value);
        if (new_h === '0') {
            new_h = '00'
        }
    let new_m = formatTime(addAlarm.a_min.value);
        if (new_m === '0') 
        {
            new_m = '00'
        }
    let new_s = formatTime(addAlarm.a_sec.value);
        if (new_s === '0') {
            new_s = '00'
        }

    const newAlarm = `${new_h}:${new_m}:${new_s}`

    // below code adds New alarm to alarm List
    if (isNaN(newAlarm)) {
        if (!alarmList.includes(newAlarm)) {
            alarmList.push(newAlarm);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else {
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else {
        alert("Invalid Time Entered")
    }
})


//it calls updateTime() every second
setInterval(updateTime, 1000);

