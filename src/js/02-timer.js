import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  input: document.querySelector(`#datetime-picker`),
  startBtn: document.querySelector(`button[data-start]`),
  leftDays: document.querySelector(`span[data-days]`),
  leftHours: document.querySelector(`span[data-hours]`),
  leftMinutes: document.querySelector(`span[data-minutes]`),
  leftSeconds: document.querySelector(`span[data-seconds]`),
  timer: document.querySelector(`.timer`),
};

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener(`click`, onClick);
Notify.info('Перед мандрівкою обери дату призначення!!!');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= new Date()) {
      Notify.info('Агов, ми прямуємо у майбутнє!!!');
      return;
      }
      
    refs.startBtn.removeAttribute('disabled');
  },
};
addStyles();
const fp = new flatpickr(refs.input, options);
function onClick() {

  const intervalId = setInterval(() => {
    const deltaTime = fp.selectedDates[0] - new Date();
    if (deltaTime < 0) {
      clearInterval(intervalId);
      refs.startBtn.setAttribute('disabled', true);
      Notify.info(`Ми на місці!`);
      return;
    }
    const time = convertMs(deltaTime);
    displayData(time);
  }, 1000);
}
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
function displayData({ days, hours, minutes, seconds }) {
  refs.leftDays.textContent = days.toString().padStart(3, `00`);
  refs.leftHours.textContent = hours.toString().padStart(2, `00`);
  refs.leftMinutes.textContent = minutes.toString().padStart(2, `00`);
  refs.leftSeconds.textContent = seconds.toString().padStart(2, `00`);
}

// function addLeadingZero(value) {
//     if (value >= 100) {
//         value.toString().padStart(3, `00`);
//     }
//     value.toString().padStart(2,`0`)
// }
function addStyles() {
    refs.timer.style.display = 'flex';
    refs.timer.style.marginTop = `${10}px`;
        refs.timer.style.gap = `${10}px`;
        refs.leftDays.style.border = `${2}px  solid`;
    refs.leftHours.style.border = `${2}px  solid`;
    refs.leftMinutes.style.border = `${2}px  solid`;
    refs.leftSeconds.style.border = `${2}px solid`;
}