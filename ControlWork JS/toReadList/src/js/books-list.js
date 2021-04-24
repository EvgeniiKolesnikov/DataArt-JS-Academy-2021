'use strict';
import { Api } from "./api";
import { BookCard } from "./book-card";
import { BookInfo } from "./book-info";

export class BooksList {
  // pageNum = 1;
  // globalPage = [];
  currentPage = [];
  bookCard = new BookCard();

  constructor() {
    const api = new Api();

    const booksList =     document.querySelector("#booksList");
    const booksShown =    document.querySelector("#booksShown");
    const booksFound =    document.querySelector("#booksFound");

    const searchInput =   document.querySelector("#searchInput");
    const searchClear =   document.querySelector("#searchClear");
    const searchButton =  document.querySelector("#searchButton");

    const spinnerBig =    document.querySelector("#spinnerBig");

    searchButton.addEventListener("click", (e) => this.getData(api));
    searchInput.addEventListener("keyup", (e) => {
      if(e.code === 'Enter') {
        this.getData(api);
      }
    });

    searchInput.addEventListener("input", (e) => (this.onChangeInput(e)));
    searchClear.addEventListener("click", (e) => (this.onClickClear(e)));

    }

  onChangeInput(e) {
    searchClear.style.display = (e.currentTarget.value == "" || undefined) ? 'none' : 'block';
    // getData(api);
  }
  
  onClickClear(e) {
    searchInput.value = "";
    e.currentTarget.style.display = 'none';
    booksList.innerHTML = ``;
  }

  getData(api) {
    const querry = searchInput.value;
    if (!querry) {
      return;
    }
    booksList.innerHTML = ``;
    spinnerBig.style.display = "block";
    api.search(querry, 1).then(page => {
      this.processbooksList(page);
      this.bookCard.setCurrentPage(this.currentPage);
      // console.log(this.currentPage);
      booksShown.innerHTML = `Shown books: ${this.numberShownBooks(page.start, page.docs.length)}`;
      booksFound.innerHTML = `Found books: ${page.numFound}`;
      spinnerBig.style.display = "none";
      console.log(page);
    });
  }

  numberShownBooks( start, pageSize) {
    let numberShownBooks;
    if (pageSize == 100) {
      numberShownBooks = start + 100;
    } else {
      numberShownBooks = start + pageSize;
    }
    return numberShownBooks;
  }

  processbooksList(page) {
    page.docs.forEach(item => {
      item.id = item.key.split("/").pop();
    });
    this.currentPage = page.docs;

    const booksListHTML = this.currentPage.reduce((acc, item) => {
      return (acc +
        `<div id="${item.id}" class="book-card">
          <div class="book-card__container">
            <span class="book-card__title">${item.title}</span> 
            ${item.language ? `<span class="book-card__lang">${item.language.join(", ")}</span>` : ``}
            ${item.subtitle ? `<div class="book-card__subtitle">${item.subtitle}</div>` : ``}
          </div> 
        </div>`
      );
    }, "");
    booksList.innerHTML = booksListHTML;
  }
}
