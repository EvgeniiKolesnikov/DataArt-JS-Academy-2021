'use strict';

export class ButtonsController {
  id;

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
    let id;
    // console.log(e);

    if (item.tagName == 'BUTTON') {
      console.log('click button');
      id = item.parentNode.parentNode.parentNode.dataset.bookId;

      if (item.id == 'markAsReadButton') {
        console.log(item.id);
        
      }
      if (item.id == 'unmarkAsReadButton') {
        console.log(item.id);

      }
      if (item.id == 'removefromListButton') {
        console.log(item.id);

      }
    } 
    
    if (item.tagName == 'DIV') {
      console.log('click book');
      id = item.dataset.bookId;
    }

    console.log(id);

  }
}


