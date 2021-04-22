import { BookInfo } from "./bookInfo";

export class BooksUI {
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
    const searchButton = document.getElementById("searchButton");
    const spinner = document.getElementById("spinner");
    const bookInfo = new BookInfo();

    searchButton.addEventListener("click", () => this.getData(api));

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
          LastSelectedBook.classList.remove("select-book");
        }
      }
      this.LastSelectedBook = selectBook;
      targetDiv.classList.add("select-book");
      bookInfo.setBookInfo(selectBook);
    });
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
    // const booksHTML = this.currentPage.reduce((acc, item) => {
    //   return (acc +
    //     `<div id="${item.id}" class="book-info">${item.title} (${item.language ? item.language.join(", ") : `language`})</div>`
    //   );
    // }, "");

    // const booksHTML = this.currentPage.reduce((acc, item) => {
    //   return (acc +
    //     `<div id="${item.id}" class="book-info">
    //       <div class="book-info__title">${item.title}</div> 
    //       ${item.language ? `<div class="book-info__lang">${item.language.join(", ")}</div>` : ``}
    //     </div>`
    //   );
    // }, "");

    const booksHTML = this.currentPage.reduce((acc, item) => {
      return (acc +
        `<div id="${item.id}" class="book-info">
          <div class="book-info__title">${item.title} 
          ${item.language ? `<span class="book-info__lang">${item.language.join(", ")}</span>` : ``}
          </div> 
          ${item.subtitle ? `<div class="book-info__subtitle">${item.subtitle}</div>` : ``}
        </div>`
      );
    }, "");

    this.searchResult.innerHTML = booksHTML;
  }
}

{/* <div class="book-info__subtitle">${item.subtitle}</div>  */}