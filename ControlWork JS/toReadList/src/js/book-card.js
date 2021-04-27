'use strict';

export class BookCard {
  constructor(bookInfo) {
    console.log('BookCard');
    this.currentPage = [];
    this.bookInfo = bookInfo;
    const booksList = document.querySelector("#booksList");
    booksList.addEventListener("click", e => 
    this.onClickBookCard(e, this.currentPage));
  }

  setCurrentPage(currentPage) {
    this.currentPage = currentPage;
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