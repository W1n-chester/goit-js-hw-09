import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector(`.form`);
form.addEventListener(`submit`, addPromise);
function addPromise(evt) {
  evt.preventDefault();
  // console.log(evt.currentTarget.elements.delay.value)
  const {
    delay: { value: delay },
    step: { value: step },
    amount: { value: amount },
  } = evt.currentTarget.elements;
  // console.log(delay)
  let newDelay = Number(delay);
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    newDelay += Number(step);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((fulfill, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        fulfill({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
