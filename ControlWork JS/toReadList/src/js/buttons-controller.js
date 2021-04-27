'use strict';

export class ButtonsController {
  bookId;
  constructor(storage, bookInfo) {
    console.log('ButtonsController');
    this.storage = storage;
    this.bookInfo = bookInfo;
    this.readList = document.getElementById("readList");
    const addToReadButton = document.getElementById("addToReadButton");

    addToReadButton.addEventListener("click", e => 
    this.bookInfo.addToReadList(this.storage));

    this.readList.addEventListener("click", e => this.trackElement(e));
  }

  trackElement(e) {
    let item = e.target;
    if (item.tagName == 'BUTTON') {
      // console.log('click button');
      this.bookId = item.parentNode.parentNode.parentNode.dataset.bookId;
      this.onChangeReadList(this.bookId, item.id);
    }  
    if (item.tagName == 'DIV') {
      // console.log('click book');
      this.bookId = item.dataset.bookId;
      this.showBook(this.bookId);
    }
  }

  onChangeReadList(bookId, divId) {
    const myBooks = this.storage.get("myBooks");
    myBooks.forEach((item, i, object) => {
      if (item.id == bookId) {
        if (divId == 'markAsReadButton') {
          item.read = true;
        }
        if (divId == 'unmarkAsReadButton') {
          item.read = false;
        }
        if (divId == 'removefromListButton') {
          object.splice(i, 1);
        }
      }
    });
    this.storage.set("myBooks", myBooks);
  }

  showBook(bookId) {
    const myBooks = this.storage.get("myBooks");
    const selectBook = myBooks.find(item => item.id == bookId);
    if (!selectBook) {
      return;
    }
    this.bookInfo.setBookInfo(selectBook);
  }
}


