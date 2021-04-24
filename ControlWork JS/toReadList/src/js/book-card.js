'use strict';
import { BookInfo } from "./book-info";

export class BookCard {
  constructor() {
    this.currentPage;
    this.bookInfo = new BookInfo(); // тоже самое, что и перед конструктором без this
    const booksList = document.querySelector("#booksList");
    booksList.addEventListener("click", e => this.onClickBookCard(e, this.currentPage));
  }

  setCurrentPage(gottenCurrentPage) {
    this.currentPage = gottenCurrentPage;
  }

  onClickBookCard(e, currentPage) {
    const targetDiv = e.target;
    const id = targetDiv.id;
    const selectBook = currentPage.find(item => item.id === id);
    if (!selectBook) {
      return;
    }
    if (this.LastSelectedBook) {
      const LastSelectedBook = booksList.querySelector("#" + this.LastSelectedBook.id);
      if (LastSelectedBook) {
        LastSelectedBook.classList.remove("book-card--active");
      }
    }
    this.LastSelectedBook = selectBook;
    targetDiv.classList.add("book-card--active");
    this.bookInfo.setBookInfo(selectBook);
  }
}