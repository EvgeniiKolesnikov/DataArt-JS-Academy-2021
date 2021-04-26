'use strict';

export class ButtonsController {
  bookId;

  constructor(storage) {
    console.log('ButtonsController');
    this.storage = storage;
    this.readList = document.getElementById("readList");

    // const markAsReadButton = document.getElementById("markAsReadButton");
    // const unmarkAsReadButton = document.getElementById("unmarkAsReadButton");
    // const removefromListButton = document.getElementById("removefromListButton");

    // markAsReadButton.addEventListener("click", e => this.markBook(this.storage));
    // unmarkAsReadButton.addEventListener("click", e => this.unmarkBook(this.storage));
    // removefromListButton.addEventListener("click", e => this.removeBook(this.storage));

    this.readList.addEventListener("click", e => this.trackElement(e));
  }

  trackElement(e) {
    let item = e.target;
    let bookId;

    if (item.tagName == 'BUTTON') {
      // console.log('click button');
      bookId = item.parentNode.parentNode.parentNode.dataset.bookId;

      if (item.id == 'markAsReadButton') {
        // console.log(item.id);
        this.markBook(bookId);
      }
      if (item.id == 'unmarkAsReadButton') {
        // console.log(item.id);
        this.unmarkBook(bookId);
      }
      if (item.id == 'removefromListButton') {
        // console.log(item.id);
        this.removeBook(bookId);
      }
    } 
    
    if (item.tagName == 'DIV') {
      // console.log('click book');
      bookId = item.dataset.bookId;
      this.showBook(bookId);
    }

    this.bookId = bookId;
    console.log(bookId);
  }

  markBook(bookId) {
    
  }
  unmarkBook(bookId) {

  }
  removeBook(bookId) {

  }
  showBook(bookId) {

  }
}


