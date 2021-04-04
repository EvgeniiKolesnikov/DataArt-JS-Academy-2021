// Kolesnikov E.A. JS 1

// Задание «Средняя сумма билета в кино».
// Создайте список из 10 фильмов, которые вы видели в кинотеатре. Для каждого фильма нужно указать название, жанр, и цену билета в кино. 
// Нужно получить и отобразить в консоле: 

// Фильм с самой низкой ценой билета. 
// Фильм с самой высокой ценой билета. 
// Среднюю цену билета. 
// В задаче нужно будет использовать:

// Переменные; 
// Циклы;
// Функции;
// Операторы.

let filmDB = [];

function addFilm (name, genre, price) {
  filmDB[filmDB.length] = {
    name: name,
    genre: genre,
    price: price
  }
}

function showAllFilmsOf() {
  for (let film of filmDB) {
    console.log(film);
  }
}

function showAllFilmsIn() {
  for (let i in filmDB) {
    console.log(filmDB[i]);
  }
}

function findLowerPriceFilm () {
  if (filmDB.length == 0) return;
  let targetPrice = null;
  let targetIndex = 0;
  for (let i in filmDB) {
    if (filmDB[i].price <= targetPrice || targetPrice == null) {
      targetPrice = filmDB[i].price;
      targetIndex = i;
    }
  }
  console.log('Lower Price Film is \n'
  + "Name: " + filmDB[targetIndex].name + '\n'
  + "Genre: " + filmDB[targetIndex].genre + '\n'
  + "Price: " + filmDB[targetIndex].price);
  document.getElementById('lpf').innerHTML += filmDB[targetIndex].name;
}

function findHigherPriceFilm () {
  if (filmDB.length == 0) return;
  let targetPrice = null;
  let targetIndex = 0;
  for (let i = 0; i < filmDB.length; i++) {
    if (filmDB[i].price >= targetPrice || targetPrice == null) {
      targetPrice = filmDB[i].price;
      targetIndex = i;
    }
  }
  console.log('Higher Price Film is \n'
  + "Name: " + filmDB[targetIndex].name + '\n'
  + "Genre: " + filmDB[targetIndex].genre + '\n'
  + "Price: " + filmDB[targetIndex].price);
  document.getElementById('hpf').innerHTML += filmDB[targetIndex].name;
}

function findMiddlePrice () {
  if (filmDB.length == 0) return;
  let middlePrice = null;
  for (let film of filmDB) {
    middlePrice += film.price;
  }
  middlePrice /= filmDB.length;
  console.log('Middle Price = ' + middlePrice.toFixed(0) + " ₽");
  document.getElementById('mp').innerHTML += middlePrice.toFixed(0) + " ₽";
}

function showInHtml () {
  for (let i = 0; i < filmDB.length; i++) {
    let element = "<p><b>"+ filmDB[i].name+"</b>" + "&nbsp; &nbsp;" +
                  "Genre: "+ filmDB[i].genre + ",&nbsp; &nbsp;" +
                  "Price: "+ filmDB[i].price +
                  "</p>";
    document.getElementById('films').innerHTML += element;
  }
}

addFilm('Fast & Furious 7', 'action', 350);
addFilm('Fast & Furious 8', 'action', 320);
addFilm('Infinity War', 'fantastic', 400);
addFilm('Knives Out', 'detective', 320);
addFilm('Lucy', 'action', 315);
addFilm('The Magnificent Seven', 'action', 250);
addFilm('WALL-E', 'cartoon', 125);
addFilm('Jumanji: Welcome to the Jungle', 'fantasy', 320);
addFilm('Step Up 3D', 'drama', 199);
addFilm('Zootopia', 'cartoon', 380);
addFilm('Madagascar', 'cartoon', 195);

//showAllFilmsOf();
//showAllFilmsIn();

showInHtml ();

findLowerPriceFilm();
findHigherPriceFilm();
findMiddlePrice();




var time = {
  year: 2016,
  month: 11,
  day: 10,
  hour: 11,
  minute: 12,
  second: 13,
  microsecond: 123456
}

console.log(Object.assign({}, time));
time.microsecond+=1;
console.log(time);




