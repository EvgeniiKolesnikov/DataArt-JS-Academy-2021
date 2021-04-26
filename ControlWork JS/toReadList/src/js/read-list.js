'use strict';

export class ReadList {
  books = [];
  BookCount = 0;
  ReadCount = 0;
  constructor() {
    console.log('ReadList');
    console.log('CALLLLLLLLL');
    this.readListBookCount = document.getElementById("readListBookCount");
    this.readListReadCount = document.getElementById("readListReadCount");
    this.readList = document.getElementById("readList");
    this.readListBook = document.getElementById("readListBook");
    this.readListRead = document.getElementById("readListRead");
  }

  loadReadList(storage) {
    // const myBooks = this.storage.get("myBooks");
    const myBooks = storage.get("myBooks");
    if (myBooks) { 
      this.setListBookHTML(myBooks);
      this.setListReadHTML(myBooks);
      this.setListAboutHTML(myBooks)
    } 
    storage.show("myBooks");
  }

  setListBookHTML(myBooks) {
    this.readListBook.innerHTML = myBooks
    .sort((prev, next) => {
      if ( prev.title < next.title ) return -1;
      if ( prev.title < next.title ) return 1;
    })
    .filter(item => item.read == false)
    .map(item => 
      `<div data-book-id="${item.id}" class="book-card book-card--read-list">
        <div class="book-card__container">
          <span class="book-card__title">${item.title}</span> 
          ${item.language ? `<span class="book-card__lang">${item.language.join(", ")}</span>` : ``}
          ${item.subtitle ? `<div class="book-card__subtitle">${item.subtitle}</div>` : ``}
          ${item.author_name ? `<div class="book-card__author">${item.author_name.join(", ")}</div>` : ``}
          <div class="book-card__buttons">
            <button class="book-card__button" id="markAsReadButton">Mark as read</button>
            <button class="book-card__button" id="removefromListButton">Remove from list</button>
          </div>
        </div> 
      </div>`
    ).join("");
  }

  setListReadHTML(myBooks) {
    this.readListRead.innerHTML = myBooks
    .sort((prev, next) => {
      if ( prev.title < next.title ) return -1;
      if ( prev.title < next.title ) return 1;
    })
    .filter(item => item.read == true)
    .map(item => 
      `<div data-book-id="${item.id}" class="book-card book-card--read">
        <div class="book-card__container">
          <span class="book-card__title">${item.title}</span> 
          ${item.language ? `<span class="book-card__lang">${item.language.join(", ")}</span>` : ``}
          ${item.author ? `<div class="book-card__author">${item.author.join(", ")}</div>` : ``}
          <div class="book-card__buttons">
            <button class="book-card__button" id="unmarkAsReadButton">unMark as read</button>
            <button class="book-card__button" id="removefromListButton">Remove from list</button>
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