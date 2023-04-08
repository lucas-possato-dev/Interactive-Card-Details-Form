const errors = document.querySelectorAll('.error');
const confirm = document.querySelector('#confirm');
const inputs = document.querySelectorAll('.card-form input');
const spansFront = document.querySelectorAll('.card-front span');
const spanBack = document.querySelector('.card-back span');
const completed = document.querySelector('.completed');
const monthInput = document.querySelector('#MM');
const yearInput = document.querySelector('#YY');
const monthYearSpan = document.querySelector('.card-front .date');
const cardForm = document.querySelector('.card-form');
const errorLetters = document.querySelector('.errorLetters');
const cardNumberInput = document.getElementById('cardNumber');

function handleClick(event) {
  let isEmpty = false;
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.length === 0) {
      isEmpty = true;
      inputs[i].classList.add('errorBorder');
    } else {
        inputs[i].classList.remove('errorBorder');
    }
  }
  if (isEmpty) {
    event.preventDefault();
    for (let i = 0; i < errors.length; i++) {
      if (!errorLetters.classList.contains('active')) {
        errors[i].classList.add('active');
      }
    }
  } else if (errorLetters.classList.contains('active')) {
    event.preventDefault();
  }
  else {
    for (let i = 0; i < errors.length; i++) {
      event.preventDefault();
      errors[i].classList.remove('active');
      completed.classList.add('active');
      cardForm.classList.add('inactive');
      }
  }
}

function handleInput() {
  inputs.forEach((input, index) => {
    input.addEventListener('input', (event) => {
      const modifiedInput = event.target;
      if (modifiedInput.value.length > 0) {
        errors.forEach((error) => {
          if (error.previousElementSibling === modifiedInput) {
            error.classList.remove('active');
          } else if (isNaN(modifiedInput.value) === false) {
            error.classList.remove('active');
            if (index === 0) {
              errorLetters.classList.add('active');
            } 
          }
          else if (modifiedInput.value.length > 0  && index === 0) {
            errorLetters.classList.remove('active');
            }
        })
        input.classList.remove('errorBorder');
      } 
      if (input.dataset.target === 'front') {
        if (input.id === 'MM' || input.id === 'YY') {
          const month = monthInput.value.padStart(2, '0').substring(0, 2);
          const year = yearInput.value.slice(-2).substring(0, 2);
          monthYearSpan.textContent = `${month}/${year}`;
        } else {
          spansFront[input.dataset.index].textContent = input.value.substring(0,25);
        }
      } else {
        spanBack.textContent = input.value.substring(0, 3);
      }
    });
  });
}

cardNumberInput.addEventListener('input', (event) => {
  const input = event.target;
  const regex = /[^0-9]/g;
  input.value = input.value.replace(regex, "");
});


cardNumberInput.addEventListener('input', (event) => {
  const cardNumber = event.target.value.replaceAll(' ', '');
  const formattedCardNumber = (cardNumber.match(/.{1,4}/g) || []).join(' ');
  event.target.value = formattedCardNumber.substring(0, 19);
});

handleInput();
confirm.addEventListener('click', handleClick);
