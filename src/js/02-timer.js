// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const howDays = document.querySelector('[data-days]');
const howHours = document.querySelector('[data-hours]');
const howMin = document.querySelector('[data-minutes]');
const howSec = document.querySelector('[data-seconds]');
const timerInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      window.alert('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
    }
  },
};

btnStart.addEventListener('click', onStart);

function onStart() {
  btnStart.disabled = true;
  timerInput.disabled = true;

  const intervalId = setInterval(() => {
    const currentDate = Date.now();
    const selectedDate = new Date(timerInput.value);
    const howMachTime = selectedDate - currentDate;

    if (howMachTime < 1000) {
      clearInterval(intervalId);
    }

    const timer = convertMs(howMachTime);

    howDays.textContent = timer.days.toString().padStart(2, 0);
    howHours.textContent = timer.hours.toString().padStart(2, 0);
    howMin.textContent = timer.minutes.toString().padStart(2, 0);
    howSec.textContent = timer.seconds.toString().padStart(2, 0);
  }, 1000);
}

flatpickr(timerInput, options);
