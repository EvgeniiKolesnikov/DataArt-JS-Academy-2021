'use strict';
import skin from './../img/skin.png';

export class ReadList {
  books = [];
  BookCount = 0;
  ReadCount = 0;
  constructor() {
    // console.log('ReadList');
    this.readListBookCount = document.getElementById("readListBookCount");
    this.readListReadCount = document.getElementById("readListReadCount");
    this.readListBook = document.getElementById("readListBook");
    this.readListRead = document.getElementById("readListRead");

  }

  loadReadList(storage) {
    const myBooks = storage.get("myBooks");
    if (myBooks) { 
      this.setReadListHTML(myBooks, false);   // не прочитанные книги
      this.setReadListHTML(myBooks, true);    // прочитанные книги
      this.setListAboutHTML(myBooks)
    } 
    storage.show("myBooks");
  }

  setReadListHTML(myBooks, bool) {
    const blueBook = `https://www.clker.com/cliparts/c/f/n/A/k/T/book-th.png`;
    const redBook = `https://www.clker.com/cliparts/U/a/w/s/n/V/c-users-public-pictures-sample-pictures-th.png`;
    let targetDiv = bool ? this.readListRead : this.readListBook;

    targetDiv.innerHTML = myBooks
    .sort((prev, next) => {
      if ( prev.title < next.title ) return -1;
      if ( prev.title < next.title ) return 1;
    })
    .filter(item => item.read == bool)
    .map(item => 
      `<div data-book-id="${item.id}" class="book-card book-card--read-${bool}">
        <div class="book-card__container book-card__container">
          <img class="book-card__img" src="${item.cover_i 
            ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg?default=false` 
              : `${item.isbn 
                ? `https://covers.openlibrary.org/b/isbn/${item.isbn[0]}-L.jpg?default=false`
              : `${skin}`}`
            }" onError="this.src='${skin}'">
            <div class="book-card__header">
            <span class="book-card__title">${item.title}</span> 
            ${item.language ? `<span class="book-card__lang">${item.language.join(", ")}</span>` : ``}
            ${item.subtitle && (!bool) ? `<div class="book-card__subtitle">${item.subtitle}</div>` : ``}
            ${item.author_name ? `<div class="book-card__author">${item.author_name.join(", ")}</div>` : ``}
            <div class="book-card__buttons">
              <button class="book-card__button" id="${bool ? `un` : ``}markAsReadButton">${bool ? `un` : ``}Mark as read</button>
              <button class="book-card__button" id="removefromListButton">Remove from list</button>
            </div>
            </div> 
        </div> 
      </div>`
    ).join("");
  }

  setListAboutHTML(myBooks) {
    this.BookCount = myBooks.length;
    this.readListBookCount.innerHTML = 
    `<div class="read-list__item" id="readListBookCount">${this.BookCount} books,</div>`;

    this.ReadCount = myBooks.filter(item => item.read == true).length;
    this.readListReadCount.innerHTML = 
    `<div class="read-list__item" id="readListBookCount">${this.ReadCount} read</div>`;
  }
}