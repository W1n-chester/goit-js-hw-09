const body = document.querySelector(`body`);
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
startBtn.addEventListener(`click`, startRainbowTrip);
stopBtn.addEventListener(`click`, stopRainbowTrip);
stopBtn.setAttribute('disabled', true);
let timerId = null;
function startRainbowTrip() {
  timerId = setInterval(changeBgColor, 1000);
  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');
}
function stopRainbowTrip() {
  //   console.log(`-`);т

  clearInterval(timerId);
  stopBtn.setAttribute('disabled', true);
  startBtn.removeAttribute('disabled');
}
function changeBgColor() {
  const bgColor = getRandomHexColor();
  body.style.backgroundColor = bgColor;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
//  ПОМОГИТЕ С ВОПРОСОМ )
// РАЗНИЦА В ОБЯВЛЕНИИ ПЕРЕМЕННОЙ   timerId, ПОЧЕМУ НЕ РАБОТАЛО, Я ЖЕ ЕЕ ВЫТАЩИЛ ИЗ ФУНКЦИИ РЕТЮРНОМ В ОБЩУЮ ОБЛАСТЬ ВИДИМОСТИ

// const body = document.querySelector(`body`);
// const startBtn = document.querySelector('button[data-start]');
// const stopBtn = document.querySelector('button[data-stop]');
// startBtn.addEventListener(`click`, startRainbowTrip);
// stopBtn.addEventListener(`click`, stopRainbowTrip);
// stopBtn.setAttribute('disabled', true);

// function startRainbowTrip() {
//   const timerId = setInterval(changeBgColor, 1000);
//   startBtn.setAttribute('disabled', true);
//   stopBtn.removeAttribute('disabled');
// return timerId;
// }
// function stopRainbowTrip() {
//   //   console.log(`-`);

//   clearInterval(timerId);
//   stopBtn.setAttribute('disabled', true);
//   startBtn.removeAttribute('disabled');
// }
// function changeBgColor() {
//   const bgColor = getRandomHexColor();
//   body.style.backgroundColor = bgColor;
// }
// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }
