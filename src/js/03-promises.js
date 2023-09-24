import { Notify } from 'notiflix/build/notiflix-notify-aio';

const generalForm = document.querySelector('.form');

generalForm.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  let firstDelay = Number(
    document.querySelector('input[name = "delay"]').value
  );
  let delayStep = Number(document.querySelector('input[name = "step"]').value);
  let amount = Number(document.querySelector('input[name = "amount"]').value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstDelay += delayStep;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
