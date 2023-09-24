const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bgColor = document.querySelector('body');

btnStart.addEventListener('click', onStart);

let startColor = false;
btnStop.disabled = true;

function onStart() {
  const IntId = setInterval(() => {
    bgColor.style.backgroundColor = getRandomHexColor();
    startColor = true;

    if (startColor) {
      btnStart.disabled = true;
      btnStop.disabled = false;
    }

    btnStop.addEventListener('click', onStop);
    function onStop() {
      clearInterval(IntId);
      startColor = false;
      btnStart.disabled = false;
      btnStop.disabled = true;
    }
  }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
