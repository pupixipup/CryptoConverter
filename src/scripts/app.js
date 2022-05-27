export let obj;

async function getJson() {
  let response = await fetch('/cryptolist.php', {
    method: 'POST',
  })
  let data = await response.json();
  return data;
}

async function main() {
  obj = await getJson();
  obj = await obj.data.coins;
  console.log(obj);
}

main();