const helperBtn = document.querySelector('[name="helper-btn"]');
const plusInterval = document.querySelector('#helper-value-one').nextElementSibling;
const minusInterval = document.querySelector('#helper-value-one').previousElementSibling;
const plusCountdown = document.querySelector('#helper-value-twp').nextElementSibling;
const minusCountdown = document.querySelector('#helper-value-two').previousElementSibling;
var helperInterval, intervalCounter, beep_interval, beep_countdown;
intervalCounter = 0;
let countdownLimit;

plusInterval.addEventListener('touchend', function(e) {
  e.preventDefault();
  actionClick(plusInterval);
}, {passive: false});
minusInterval.addEventListener('touchend', function(e) {
  e.preventDefault();
  actionClick(minusInterval);
}, {passive: false});
plusCountdown.addEventListener('touchend', function(e) {
  e.preventDefault();
  actionClick(plusCountdown);
}, {passive: false});
minusCountdown.addEventListener('touchend', function(e) {
  e.preventDefault();
  actionClick(minusCountdown);
}, {passive: false});
document.addEventListener('click', function(e) {
  actionClick(e.path[0]);
});

function actionClick(clickedElement) {
  if (clickedElement.classList.contains('helper-minus')) {
    let changeElement = clickedElement.nextElementSibling;
    changeTo = parseInt(changeElement.innerHTML) - 1;
    changeElement.innerHTML = Math.max(0, changeTo);
  } else if (clickedElement.classList.contains('helper-plus')) {
    let changeElement = clickedElement.previousElementSibling;
    changeTo = parseInt(changeElement.innerHTML) + 1;
    if (changeElement.id == "helper-value-two") {
      let oneValue = parseInt(document.querySelector('#helper-value-one').innerHTML);
      changeElement.innerHTML = Math.min(999, changeTo, Math.max(0, oneValue - 1));
    } else {
      changeElement.innerHTML = Math.min(999, changeTo);
    }
  }
}

helperBtn.addEventListener('click', function() {
  if (helperBtn.innerHTML == "Go") {
    let oneValue = parseInt(document.querySelector('#helper-value-one').innerHTML);
    let twoValue = parseInt(document.querySelector('#helper-value-two').innerHTML);
    debugger;
    if (beep_interval === undefined) {
      beep_interval  = new Audio('beep_interval.wav');
    };
    if (beep_countdown === undefined) {
        beep_countdown  = new Audio('beep_countdown.wav');
    };
    // Only run if value of helper one is above 0.
    if (oneValue > 0) {
      helperBtn.innerHTML = "Stop";
      helperBtn.classList.add("btn-stop");

      helperInterval = setInterval(function() {
        // Run code to create interval beeps.
        if ((intervalCounter % oneValue) == 0) {
          playInterval();
        } else if (intervalCounter >= countdownLimit) {
          playCountdown();
        };
        intervalCounter += 1;
        countdownLimit = (Math.ceil(intervalCounter / oneValue) * oneValue) - twoValue;
      }, 1000);
    }
  } else {
    helperBtn.innerHTML = "Go";
    helperBtn.classList.remove("btn-stop");
    clearInterval(helperInterval);
    intervalCounter = 0;
  }
});

function playInterval() {
  beep_interval.play();
};

function playCountdown() {
  beep_countdown.play();
}
