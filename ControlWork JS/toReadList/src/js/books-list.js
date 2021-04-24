'use strict';

export class BooksList {
  constructor() {
    this.currentPage = [];
    // const booksList =     document.querySelector("#booksList");
    // const booksShown =    document.querySelector("#booksShown");
    // const booksFound =    document.querySelector("#booksFound");
  }

  addBooksList(page) {
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
    booksShown.innerHTML = `Shown books: ${this.numShown(page.start, page.docs.length)}`;
    booksFound.innerHTML = `Found books: ${page.numFound}`;
  }
  
  numShown(start, pageSize) {
    let numberShownBooks;
    if (pageSize == 100) {
      numberShownBooks = start + 100;
    } else {
      numberShownBooks = start + pageSize;
    }
    return numberShownBooks;
  }
}
