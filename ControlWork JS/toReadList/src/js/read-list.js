'use strict';

export class ReadList {
  books = [];
  BookCount = 0;
  ReadCount = 0;
  constructor(storage) {
    console.log('ReadList');
    this.storage = storage;
    this.readListBookCount = document.getElementById("readListBookCount");
    this.readListReadCount = document.getElementById("readListReadCount");
    this.readList = document.getElementById("readList");
    this.readListBook = document.getElementById("readListBook");
    this.readListRead = document.getElementById("readListRead");

    this.loadReadList();
  }

  loadReadList() {
    const myBooks = this.storage.get("myBooks");
    if (myBooks) { 
      this.setListBookHTML(myBooks);
      this.setListReadHTML(myBooks);
      this.setListAboutHTML(myBooks)
    } 
    this.storage.show("myBooks");
  }

  setListBookHTML(myBooks) {
    this.readListBook.innerHTML += myBooks.filter(item => item.read == false).map(item => 
      `<div data-book-id="${item.id}" class="book-card book-card--read-list">
        <div class="book-card__container">
          <span class="book-card__title">${item.title}</span> 
          ${item.language ? `<span class="book-card__lang">${item.language.join(", ")}</span>` : ``}
          ${item.subtitle ? `<div class="book-card__subtitle">${item.subtitle}</div>` : ``}
          ${item.author ? `<div class="book-card__author">${item.author.join(", ")}</div>` : ``}
          <div class="book-card__buttons">
            <button class="book-card__button" id="markAsReadButton">Mark as read</button>
            <button class="book-card__button" id="removefromListButton">Remove from list</button>
          </div>
        </div> 
      </div>`
    ).join("");
  }

  setListReadHTML(myBooks) {
    this.readListRead.innerHTML += myBooks.filter(item => item.read == true).map(item => 
      `<div data-book-id="${item.id}" class="book-card book-card--read">
        <div class="book-card__container">
          <span class="book-card__title">${item.title}</span> 
          ${item.language ? `<span class="book-card__lang">${item.language.join(", ")}</span>` : ``}
          ${item.author ? `<div class="book-card__author">${item.author.join(", ")}</div>` : ``}
          <div class="book-card__buttons">
            <button class="book-card__button" id="unmarkAsReadButton">Mark as read</button>
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