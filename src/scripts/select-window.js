import { obj } from "./app";

let isPopupShown = false;

function showPopup() {
  let popup = document.createElement("ul");
  if (!isPopupShown) {
    if (this.parentElement.classList.contains("to")) {
      popup.classList.add("to-select");
    } else popup.classList.add("from-select");
    popup.classList.add("select-window");
    popup.innerHTML = displayCurrencies(obj);
    popup.style.top = this.offsetTop + "px";
    popup.style.left = this.offsetLeft + "px";
    document.body.append(popup);
    isPopupShown = true;
  }
}

let selectBtns = document.querySelectorAll(".converter__select");

selectBtns.forEach((btn) => btn.addEventListener("click", showPopup));

window.addEventListener("click", (event) => {
  if (
    !event.target.classList.contains("converter__select") &&
    !event.target.classList.contains("select-window") &&
    isPopupShown
  ) {
    document.querySelector(".select-window").remove();
    isPopupShown = false;
  }
});

function displayCurrencies(currencies) {
  let htmlData = "";
  let counter = 0;
  for (let item of currencies) {
    htmlData += `<li data-index="${counter}" class="select-window-item">${item.name}</li>`;
    counter++;
  }
  return htmlData;
}

window.addEventListener("click", (event) => {
  setCurrency(event);
});

let selectedCurrency = "Bitcoin";
let selectedCurrencyValueBTC1 = 1;
let selectedCurrencyValueUSD1 = 0;

let selectedCurrencyValueBTC2 = 1;
let selectedCurrencyValueUSD2 = 0;

let fieldOne = document.querySelector("#input1");
let fieldTwo = document.querySelector("#input2");

function setCurrency(event) {
  if (event.target.classList.contains("select-window-item")) {
    selectedCurrency = event.target.innerText;
    let arrayIndex = event.target.dataset.index;
    if (event.target.parentElement.classList.contains("to-select")) {
      document.querySelector(".to .converter__select").innerText =
        selectedCurrency;
      selectedCurrencyValueBTC2 = obj[arrayIndex].btcPrice;
      fieldTwo.dataset.btcprice = obj[arrayIndex].btcPrice;
    } else if (event.target.parentElement.classList.contains("from-select")) {
      document.querySelector(".from .converter__select").innerText =
        selectedCurrency;
      selectedCurrencyValueBTC1 = obj[arrayIndex].btcPrice;
      fieldOne.dataset.btcprice = obj[arrayIndex].btcPrice;
    }
    console.log(selectedCurrencyValueBTC1 + " :1 ");
    console.log(selectedCurrencyValueBTC2 + " :2 ");
  }
}
fieldOne.addEventListener("focusout", () => {
  convertCurrency(fieldOne, fieldTwo);
});
fieldTwo.addEventListener("focusout", () => {
  convertCurrency(fieldTwo, fieldOne);
});

function convertCurrency(inputFrom, inputTo) {
  let value = inputFrom.value;
  inputTo.value = (value * inputFrom.dataset.btcprice) / inputTo.dataset.btcprice;
}
