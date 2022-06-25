export let obj;

async function getJson() {
  let response = await fetch('/cryptolist.php', {
    method: 'POST',
  })
  let data = await response.json();
  document.querySelector('.load').remove();
  return data;
}

async function main() {
  obj = await getJson();
  obj = await obj.data.coins;
  await drawTable(obj);
}

main();

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
