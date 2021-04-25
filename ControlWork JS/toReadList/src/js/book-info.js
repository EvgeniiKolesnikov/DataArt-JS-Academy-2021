'use strict';

import { Api } from "./api";

export class BookInfo {
  targetBook = [];
  api = new Api();
  constructor() {
    console.log('BookInfo');
    this.bookInfoHeader = document.getElementById("bookInfoHeader");
    this.bookInfoProps = document.getElementById("bookInfoProps");
    this.addToReadButton = document.getElementById("addToReadButton");
    addToReadButton.addEventListener("click", e => this.addToReadList());
  }

  addToReadList() {
    // console.log(this.targetBook);
    let myBooks = [];
    this.targetBook.read = false;

    let returnMyBooks = JSON.parse(localStorage.getItem("myBooks"))
    if (returnMyBooks) {
      console.log('yes MyBook DB');
      myBooks = returnMyBooks.slice();
      let checkBookInStorage = returnMyBooks.filter(item => 
        item.id == this.targetBook.id).length > 0;
      console.log("book in storage? " + checkBookInStorage);
      if (!checkBookInStorage) {
        console.log('push book in storage');
        myBooks.push(this.targetBook);
        console.log(myBooks);
      }
    } else {
      console.log('no MyBook DB');
      myBooks.push(this.targetBook);
    }

    console.log(returnMyBooks);
    console.log(myBooks);

    let serialMyBooks = JSON.stringify(myBooks); //сериализуем его
    // console.log(serialMyBooks);
    localStorage.setItem("myBooks", serialMyBooks); 
    
    //очищаем все хранилище
    // localStorage.clear(); 
  }


  setBookInfo(book) {
    this.targetBook = book;
    this.bookInfoHeader.innerHTML = ``;
    this.bookInfoProps.innerHTML = ``;
    addToReadButton.style.display = "block";
    // this.bookInfoProps.innerHTML += book.title ? `<h2 class="book-info__title">${book.title}</h2>` : ``; // var 3
    // book.title && (this.bookInfoProps.innerHTML += `<h3 class="book-info__title">${book.title}</h3>`);   // var 2
    this.bookInfoHeader.innerHTML += `<h2 class="book-info__title">${book.title}</h2>`;                     // var 1
    if (book.subtitle) {
      this.bookInfoProps.innerHTML += `<h3 class="book-info__subtitle">${book.subtitle}</h3>` 
    }
    this.bookInfoProps.innerHTML += `<img class="book-info__img" id="bookPicture"></img>`; 
    if (book.isbn) {
      this.loadBookImage(book);
    }
    this.addPropsHtml(`Author:`, book.author_name?.join(", "));
    this.addPropsHtml(`Languages available:`, book.language
      ?.map(item => this.getFlagHTML(item) + item)
      .join(", "));
    this.addPropsHtml(`Full text available:`, book.has_fulltext);
    this.addPropsHtml(`First publish year:`, book.first_publish_year);
    this.addPropsHtml(`Years published:`, book.publish_year?.join(", "));
  }

  addPropsHtml(propTitle, bookKey) {
    if (bookKey) {
      this.bookInfoProps.innerHTML +=  
      `<div class="book-info__prop">
        <span class="book-info__prop-title">${propTitle}</span>
        <span class="book-info__prop-value">${bookKey}</span>
      </div>`
    }
  }

  loadBookImage(book) {
    this.api.searchBookImage(book.isbn[0]).then(blob => {
      let objectURL = window.URL.createObjectURL(blob);
      let bookPicture = document.getElementById('bookPicture');
      if (bookPicture.src === '') {
        bookPicture.src = objectURL;
      }
    })
    .catch ((error) => console.log(error));
  }
//#region getFlagsHTML
  getFlagHTML(item) {
    // console.log(item);
    if (item == 'eng') item = 'gb';
    if (item == 'rus') item = 'ru';
    if (item == 'spa') item = 'es';
    if (item == 'esp') item = 'es';
    if (item == 'ger') item = 'de';
    if (item == 'chi') item = 'cn';
    if (item == 'ukr') item = 'ua';
    if (item == 'fre') item = 'fr';
    if (item == 'ita') item = 'it';
    if (item == 'jpn') item = 'jp';
    if (item == 'por') item = 'pt';
    if (item == 'iri') item = 'ie';
    if (item == 'alb') item = 'al';
    if (item == 'scc') item = 'rs';
    if (item == 'dut') item = 'nl';
    if (item == 'dan') item = 'dk';
    if (item == 'cze') item = 'cz';
    if (item == 'mon') item = 'mn';
    if (item == 'scr') item = 'hr';
    if (item == 'hrv') item = 'hr';
    if (item == 'ara') item = 'ae';
    if (item == 'pol') item = 'pl';
    if (item == 'fin') item = 'fi';
    if (item == 'swe') item = 'se';
    if (item == 'rum') item = 'ro';
    if (item == 'est') item = 'ee';
    if (item == 'sco') item = 'gb-sct';
    if (item == 'grc') item = 'gr';
    if (item == 'hun') item = 'hu';
    if (item == 'slo') item = 'sk';
    if (item == 'kor') item = 'kr';
    if (item == 'ice') item = 'is';
    if (item == 'bul') item = 'bg';
    if (item == 'tur') item = 'tr';
    if (item == 'gre') item = 'gr';
    if (item == 'arm') item = 'am';
    if (item == 'wal') item = 'gb-wls';
    if (item == 'amh') item = 'et';
    if (item == 'mol') item = 'md';
    if (item == 'tgl') item = 'ph';
    if (item == 'heb') item = 'il';
    if (item == 'lit') item = 'lt';
    if (item == 'vie') item = 'vn';
    if (item == 'nor') item = 'no';
    if (item.length === 3) return ``;
    return `<img class="book-info__flag" src="https://flagcdn.com/16x12/${item}.png"></img> `;
  }
  //#endregion getFlagsHTML
}