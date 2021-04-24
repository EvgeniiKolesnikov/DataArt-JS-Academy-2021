'use strict';
import { BookInfo } from "./book-info";

export class BooksList {
  searchResult;
  bookInfo;
  searchFound;

  currentPage = [];

  api;

  constructor(api) {
    this.searchResult = document.getElementById("searchResult");
    this.bookInfo = document.getElementById("bookInfo");
    this.searchFound = document.getElementById("searchFound");
    const searchInput = document.getElementById("searchInput");
    const searchClear = document.getElementById("searchClear");
    const searchButton = document.getElementById("searchButton");
    const spinner = document.getElementById("spinner");

    const bookInfo = new BookInfo();

    searchButton.addEventListener("click", () => this.getData(api));
    searchInput.addEventListener("keyup", e => {
      if(e.code === 'Enter') {
        this.getData(api);
      }
    });

    searchInput.addEventListener("input", (e) => (this.onChangeInput(e)));
    searchClear.addEventListener("click", (e) => (this.onClickClear(e)));

    this.searchResult.addEventListener("click", e => {
      this.bookInfo.innerHTML = ``;
      const targetDiv = e.target;
      const id = targetDiv.id;
      const selectBook = this.currentPage.find(item => item.id === id);
      // console.log(`selectBook = ${selectBook}`);
      if (!selectBook) {
        return;
      }
      if (this.LastSelectedBook) {
        const LastSelectedBook = this.searchResult
          .querySelector("#" + this.LastSelectedBook.id);
        if (LastSelectedBook) {
          LastSelectedBook.classList.remove("book-card--active");
        }
      }
      this.LastSelectedBook = selectBook;
      targetDiv.classList.add("book-card--active");
      bookInfo.setBookInfo(selectBook);
    });
  }

  onChangeInput(e) {
    searchClear.style.display = (e.currentTarget.value == "" || undefined) ? 'none' : 'block';
    // getData(api);
  }
  
  onClickClear(e) {
    searchInput.value = "";
    e.currentTarget.style.display = 'none';
    this.searchResult.innerHTML = ``;
  }

  getData(api) {
    const querry = searchInput.value;
    if (!querry) {
      return;
    }
    this.searchResult.innerHTML = ``;
    spinner.style.display = "block";
    api.search(querry).then(page => {
      this.processSearchResult(page);
      this.searchFound.innerHTML = `Found books: ${page.numFound}`;
      spinner.style.display = "none";
      console.log(page);
    });
  }

  processSearchResult(page) {
    page.docs.forEach(item => {
      item.id = item.key.split("/").pop();
    });
    this.currentPage = page.docs;

    const booksHTML = this.currentPage.reduce((acc, item) => {
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
    this.searchResult.innerHTML = booksHTML;
  }
}
