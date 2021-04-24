'use strict';
import { Api } from "./api";
import { BookCard } from "./book-card";
import { BooksList } from "./books-list";

export class LoadData {
  constructor() {
    this.bookList = new BooksList();
    this.bookCard = new BookCard();
    this.api = new Api();
    // const spinnerBig =    document.querySelector("#spinnerBig");

  }

  getData(querry) {
    if (!querry) {
      return;
    }
    booksList.innerHTML = ``;
    spinnerBig.style.display = "block";
    this.api.search(querry, 1).then(page => {
      this.bookCard.setCurrentPage(page);
      this.bookList.addBooksList(page);
      spinnerBig.style.display = "none";
      // console.log(page);
    });
  }
}
