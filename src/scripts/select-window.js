import { obj } from './app';

let isPopupShown = false;

function showPopup() {
let popup = document.createElement('ul');

if (!isPopupShown) {
if (this.parentElement.classList.contains('to')) {
  popup.classList.add('to-select');
} else popup.classList.add('from-select');
popup.classList.add('select-window');
popup.innerHTML = displayCurrencies(obj);
popup.style.top = this.offsetTop + 'px';
popup.style.left = this.offsetLeft  + 'px';
document.body.append(popup);
isPopupShown = true;
}
}

console.log(obj);

let selectBtns = document.querySelectorAll('.converter__select');

selectBtns.forEach((btn) => btn.addEventListener('click' , showPopup));

window.addEventListener('click', (event) => {
  if ((!event.target.classList.contains('converter__select') && !event.target.classList.contains('select-window')) && isPopupShown) {
    document.querySelector('.select-window').remove();
    isPopupShown = false;
  }
});

function displayCurrencies(currencies) {
  let htmlData = '';
  for (let item of currencies) {
    htmlData += `<li class="select-window-item">${item.name}</li>`;
  }
  return htmlData;
}

window.addEventListener('click', (event) => {
  setCurrency(event);
});

let selectedCurrency = 'BTC';

function setCurrency(event) {
if (event.target.classList.contains('select-window-item')) {
  selectedCurrency = event.target.innerText;
  if (event.target.parentElement.classList.contains('to-select')) {
    document.querySelector('.to .converter__select').innerText = selectedCurrency;
    console.log(selectedCurrency);
  } else document.querySelector('.from .converter__select').innerText = selectedCurrency;
};
};