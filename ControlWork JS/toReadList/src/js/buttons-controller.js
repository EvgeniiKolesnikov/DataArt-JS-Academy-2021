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

    // markAsReadButton.addEventListener("click", e => this.onChangeReadList(this.storage));
    // unmarkAsReadButton.addEventListener("click", e => this.unonChangeReadList(this.storage));
    // removefromListButton.addEventListener("click", e => this.removeBook(this.storage));

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
    // console.log(this.bookId);
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
    console.log(myBooks);
    this.storage.set("myBooks", myBooks);
    console.log(myBooks);
  }
  unonChangeReadList(bookId) {
    const myBooks = this.storage.get("myBooks");
    myBooks.forEach(item => {
      if (item.id == bookId) {
        item.read = true;
        console.log(item.id);
      }
    });
    this.storage.set("myBooks", myBooks);
  }
  removeBook(bookId) {

  }
  showBook(bookId) {

  }
}


