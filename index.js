// DataArt JS 2 - Kolesnikov. E.A.

//import "./style.css";

const daysArray = [];
let rates = {};
let base = null;
let date = null;
let days = 4;

// Write Javascript code!
const appRates = document.getElementById('appRates');
appRates.innerHTML = `<h1>Exchange Rates</h1>`;
// console.log(appRates.innerHTML);

function createButtons () {
  const div = document.createElement("div");
  div.setAttribute("id", '#rateButtons');
  div.classList.add("rateButtons");
  div.style.color = "red";
  div.innerHTML = `<strong>Hello</strong> world`;
  appRates.appendChild(div);
  const html = daysArray.map(item => `<button class="rateButton">${item}</button>`);
  div.innerHTML = html.join("");
  div.addEventListener('click', (e) => {
    let content = e.target.innerHTML;
    console.log(`${content}`);
  })
}


function createRatesTable () {
  const div = document.createElement("table");
  div.classList.add("rateTable");
  appRates.appendChild(div);
  for (let key in rates) {
    // console.log( "Key: " + key + " Value: " + rates[key]);
    let flagText = key.toLocaleLowerCase().substring(0, 2);
    let flagImgTag = `<img src="https://flagcdn.com/20x15/${flagText}.png">`
    let html = `<tr><td>${flagImgTag}</td><td>${key}</td><td>${rates[key]}</td></tr>`;
    div.innerHTML += html;
  }
} 

const getJsonRates = async (date) => {
  let response = await fetch(`https://api.exchangeratesapi.io/${date}?base=RUB`);
  if (response.ok) {
    let json = await response.json();
    console.log(json);
    base = json.base;
    date = json.date;
    rates = json.rates;

    // for (const key of Object.entries(ratesArray)) {
    //   console.log(key);
    //   console.log(Object.fromEntries(Object.entries(ratesArray)));
    // }

    // console.log(base);
    // console.log(date);
    // console.log(rates);
    // console.log(Object.fromEntries(Object.entries(ratesArray)));

  } else {
    console.log("Error HTTP: " + response.status);
  }
  console.log(rates);
  createRatesTable();
}

function createDatesArray(days) {
  for (let i = 0; i < days; i++) {
    // сегодня вон чё на дворе)
    let date = new Date();
    // вычитаем дни из текущего времени, Марти
    date.setDate(date.getDate() - i);

    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;

    let item = yyyy.toString() +'-'+ mm.toString() +'-'+ dd.toString();
    daysArray.push(item);
    // console.log(date);
    // console.log('item = ' + item);
    // console.log('Year = ' + yyyy);
    // console.log('Month = ' + mm);
    // console.log('day = ' + dd);
    // console.log('=================');
  }
  console.log(daysArray);
}

// const getJsonFlags = () => {
//     let promise = fetch(`https://flagcdn.com/en/codes.json`)
//     .then (response => response.json())
//     .then (data => console.log(data)); 
// }

createDatesArray(days);
createButtons();
getJsonRates('2021-03-20');