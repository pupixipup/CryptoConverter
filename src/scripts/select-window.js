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
    popup.style.left = this.offsetLeft - popup.offsetWidth + "px";
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
      let toCurrency = document.querySelector(".to .converter__select");
      toCurrency.innerText = selectedCurrency;

      if (selectedCurrency.length >= 12) {
        toCurrency.classList.add("long-text");
      } else {
        toCurrency.classList.remove("long-text");
      }
      selectedCurrencyValueBTC2 = obj[arrayIndex].btcPrice;
      fieldTwo.dataset.btcprice = obj[arrayIndex].btcPrice;
    } else if (event.target.parentElement.classList.contains("from-select")) {
      let fromCurrency = document.querySelector(".from .converter__select");
      fromCurrency.innerText = selectedCurrency;
      if (selectedCurrency.length >= 12) {
        fromCurrency.classList.add("long-text");
      } else {
        fromCurrency.classList.remove("long-text");
      }
      selectedCurrencyValueBTC1 = obj[arrayIndex].btcPrice;
      fieldOne.dataset.btcprice = obj[arrayIndex].btcPrice;
    }

    convertCurrency(fieldOne, fieldTwo);
  }
}
fieldOne.addEventListener("input", () => {
  convertCurrency(fieldOne, fieldTwo);
});

function convertCurrency(inputFrom, inputTo) {
  let value = Number.parseFloat(inputFrom.value).toFixed(6);
  inputTo.value =
    ((value * inputFrom.dataset.btcprice) / inputTo.dataset.btcprice).toFixed(4);
}

//
document.querySelector(".disclaimer").remove();


///

function drawTable(listings) {
  let tableBody = document.querySelector(".list__body");

  tableBody.innerHTML = `<tr class="list__body-row">
<td class="list__body-cell">Name</td>
<td class="list__body-cell">Icon</td>
<td class="list__body-cell">USD Price</td>
<td class="list__body-cell">BTC Price</td>
<td class="list__body-cell">Symbol</td>
<td class="list__body-cell">Rank</td>
<td class="list__body-cell">UUID</td>
</tr>`;
  let tableContent = "";
  for (let elem of listings) {
    tableContent += `<tr class="list__body-row">
<td class="list__body-cell">${elem.name}</td>
<td class="list__body-cell">${elem.symbol}</td>
<td class="list__body-cell">${elem.price}</td>
<td class="list__body-cell">${elem.btcPrice}</td>
<td class="list__body-cell"><img src='${elem.iconUrl}' alt='${elem.name}' class='crypto-icon'></td>
<td class="list__body-cell">${elem.rank}</td>
<td class="list__body-cell">${elem.uuid}</td>
</tr>`;
  }

  tableBody.innerHTML += tableContent;
}
