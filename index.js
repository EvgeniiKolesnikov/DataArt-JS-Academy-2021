// DataArt JS 2 - Kolesnikov. E.A.

//import "./style.css";

const daysArray = [];
let rates = {};
let base = "RUB";
let date = null;
let days = 10;
const baseArray = ['RUB','USD','EUR'];

//======================================
function main() {
  const appRates = document.getElementById('appRates');
  const div = document.createElement("div");
  div.setAttribute("id", '#header');
  const html = baseArray.map(item => addBaseButton(item));
  div.innerHTML = `<h1>Exchange Rates ` + html.join("") + `</h1>`;
  appRates.appendChild(div);

  let baseButtons = document.querySelectorAll('.baseButton');
  baseButtons.forEach(item => {
    item.addEventListener('click', (e) => {
      let content = e.currentTarget.value;
      console.log(`${content}`);
      base = content;
      reloadRates();
    })
  })
}
function reloadRates() {
  getJsonRates(date, base);
}
function addBaseButton(country) {
  let flagText = country.toLocaleLowerCase().substring(0, 2);
  let flagImg = `<img type="image" src="https://flagcdn.com/40x30/${flagText}.png">`;
  let html = `<button value="${country}" class="baseButton">${flagImg}</button>`;
  return html;
}

function createButtons () {
  const div = document.createElement("div");
  div.setAttribute("id", '#rateButtons');
  div.classList.add("rateButtons");
  // div.style.color = "red";
  appRates.appendChild(div);
  const html = daysArray.map(item => `<button class="rateButton">${item}</button>`);
  div.innerHTML = html.join("");
  let rateButtons = document.querySelectorAll('.rateButton');
  rateButtons.forEach(item => {
    item.addEventListener('click', (e) => {
      let content = e.currentTarget.innerHTML;
      console.log(`${content}`);
      date = content;
      reloadRates();
    })
  })
}


function createRatesTable () {
  let checkTable = document.querySelector('.rateTable');
  if (checkTable != null || checkTable != undefined) {
    checkTable.remove();
  }
  const div = document.createElement("table");
  div.classList.add("rateTable");
  appRates.appendChild(div);
  
  let html = `<tr><th></th><th></th><th>Rate</th><th>Currency unit in ${base}</th></tr>`;
  div.innerHTML += html;
  for (let key in rates) {
    // console.log( "Key: " + key + " Value: " + rates[key]);
    let flagText = key.toLocaleLowerCase().substring(0, 2);
    let flagImgTag = `<img src="https://flagcdn.com/20x15/${flagText}.png">`
    let html = `<tr><td>${flagImgTag}</td><td>${key}</td><td>${rates[key]}</td><td>${(1/rates[key]).toFixed(2)}</td></tr>`;
    div.innerHTML += html;
  }
} 

const getJsonRates = async (date, base) => {
  let response = await fetch(`https://api.exchangeratesapi.io/${date}?base=${base}`);
  if (response.ok) {
    let json = await response.json();
    // console.log(json);
    base = json.base;
    date = json.date;
    rates = json.rates;
  } else {
    console.log("Error HTTP: " + response.status);
  }
  // console.log(rates);
  createRatesTable();
}

function createDatesArray(days) {
  for (let i = 0; i < days; i++) {
    // сегодня вон чё на дворе :)
    let now = new Date();
    // вычитаем дни из текущего времени, Марти
    now.setDate(now.getDate() - i);

    let yyyy = now.getFullYear();
    let mm = now.getMonth() + 1;
    let dd = now.getDate();

    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;

    let item = yyyy.toString() +'-'+ mm.toString() +'-'+ dd.toString();
    daysArray.push(item);
  }
  date = daysArray[0];
  console.log('Today = ', date);
}

// const getJsonFlags = () => {
//     let promise = fetch(`https://flagcdn.com/en/codes.json`)
//     .then (response => response.json())
//     .then (data => console.log(data)); 
// }

main();
createDatesArray(days);
createButtons();
reloadRates();