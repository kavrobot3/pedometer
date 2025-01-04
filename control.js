let counter = document.getElementById('counter');
let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let stepCount = 0;
let isRunning = false;

// Check if device motion is supported
if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
        .then(permissionState => {
            if (permissionState === 'granted') {
                window.addEventListener('devicemotion', handleMotionEvent);
            } else {
                alert("Motion detection permission not granted.");
            }
        })
        .catch(console.error);
} else {
    // For browsers that don't need explicit permission (older browsers)
    window.addEventListener('devicemotion', handleMotionEvent);
}

function handleMotionEvent(event) {
    if (!isRunning) return;

    let acceleration = event.accelerationIncludingGravity;
    // Basic step detection (very simplified)
    if (acceleration.y > 12) { // Adjust this threshold as needed
        stepCount++;
        counter.textContent = stepCount;
    }
}

startButton.addEventListener('click', () => {
    isRunning = true;
    stepCount = 0; // Reset counter when starting
    counter.textContent = stepCount;
});

stopButton.addEventListener('click', () => {
    isRunning = false;
});