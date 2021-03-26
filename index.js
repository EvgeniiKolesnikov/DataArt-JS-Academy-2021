// DataArt JS 2 - Kolesnikov. E.A.
//import "./style.css";

const API_URL = "https://api.exchangeratesapi.io";
const API_FLAG_URL = "https://flagcdn.com";

document.querySelector('head').innerHTML =
  `<link rel="stylesheet" type="text/css" href="style.css">`;
  
const daysArray = [];
let rates = {};
let base = "RUB";
let date = null;
let days = 7;
const baseArray = ['RUB','USD','EUR'];

//======================================
function main() {
  const appRates = document.getElementById('appRates');
  const header = document.createElement("div");
  header.setAttribute("id", '#header');
  const html = baseArray.map(item => addBaseButton(item));
  header.innerHTML = `<h1>Exchange Rates ` + html.join("") + `</h1>`;
  appRates.appendChild(header);

  header.addEventListener('click', e => {
    if (e.target.classList == ('baseButton')) {
      let content = e.target.value;
      console.log(`${content}`);
      base = content;
      reloadRates();
    };
  })
}

function addBaseButton(country) {
  let check = country == base ? 'checked' : ''; 
  let flagText = country.toLocaleLowerCase().substring(0, 2);
  let flagImg = `<img type="image" src="${API_FLAG_URL}/40x30/${flagText}.png">`;
  let html = `<input id="${country}" type="radio" name="radio" 
              value="${country}" class="baseButton" ${check}>
  <label for="${country}">${flagImg}</label> `;
  return html;
}

function createDateButtons () {
  const dateButtons = document.createElement("div");
  // dateButtons.setAttribute("id", '#dateButtons');
  dateButtons.classList.add("dateButtons");
  appRates.appendChild(dateButtons);
  const html = daysArray.map(item => `<button class="dateButton">${item}</button>`);
  dateButtons.innerHTML = html.join("");
  dateButtons.addEventListener('click', e => {
    // var 1 ==================================;
    // console.log(e.target.closest("button"));
    // if (e.target.closest("button")) {
    //   date = e.target.innerHTML;
    //   reloadRates();
    // }
      
    // var 2 ==================================;
    // console.log(e.target.tagName);
		// if (e.target.tagName !== 'BUTTON') 
    //   return null; 
    // date = e.target.innerHTML;
    // reloadRates();

    // var 3 ==================================;
    // console.log(e.target.classList.contains('dateButton'));
    // if (e.target.classList.contains('dateButton')) {
    //   date = e.target.innerHTML;
    //   reloadRates();
    // };

    // var 4 ==================================;
    if (e.target.classList == ('dateButton')) {
      let content = e.target.innerHTML;
      console.log(`${content}`);
      date = content;
      reloadRates();
    };
  })

  // let dateButtons = document.querySelectorAll('.dateButton');
  // dateButtons.forEach(item => {
  //   item.addEventListener('click', (e) => {
  //     let content = e.currentTarget.innerHTML;
  //     // console.log(`${content}`);
  //     date = content;
  //     reloadRates();
  //   })
  // })
}

function createRatesTable () {
  let checkTable = document.querySelector('.rateTable');
  if (checkTable != null || checkTable != undefined) {
    checkTable.remove();
  }
  const div = document.createElement("table");
  div.classList.add("rateTable");
  appRates.appendChild(div);
  
  let html = `<tr><th colspan="2">${date}</th>
                  <th>Rate 
                    <img src="${API_FLAG_URL}/20x15/${base.toLocaleLowerCase().substring(0, 2)}.png">
                  </th>
                  <th>Currency unit in ${base}</th>
              </tr>`;
  div.innerHTML += html;
  for (let key in rates) {
    // console.log( "Key: " + key + " Value: " + rates[key]);
    let flagText = key.toLocaleLowerCase().substring(0, 2);
    let flagImgTag = `<img src="${API_FLAG_URL}/20x15/${flagText}.png">`
    let html = `<tr><td>${flagImgTag}</td>
                    <td>${key}</td>
                    <td>${rates[key]}</td>
                    <td>${(1/rates[key]).toFixed(2)}</td>
                </tr>`;
    div.innerHTML += html;
  }
} 

const getJsonRates = async (date, base) => {
  let response = await fetch(`${API_URL}/${date}?base=${base}`);
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
  const zeroFormat = num => ("0" + num).slice(-2);
  for (let i = 0; i < days; i++) {
    // сегодня вон чё на дворе :)
    let now = new Date();
    // вычитаем дни из текущего времени, Марти
    now.setDate(now.getDate() - i);
    let item = now.getFullYear() +'-'
      + zeroFormat(now.getMonth() + 1) +'-'
      + zeroFormat(now.getDate());
    daysArray.push(item);
  }
  date = daysArray[0];
  console.log('Today = ', date);
}

function reloadRates() {
  getJsonRates(date, base);
}

// const getJsonFlags = () => {
//     let promise = fetch(`https://flagcdn.com/en/codes.json`)
//     .then (response => response.json())
//     .then (data => console.log(data)); 
// }

main();
createDatesArray(days);
createDateButtons();
reloadRates();