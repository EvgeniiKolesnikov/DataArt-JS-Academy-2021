'use strict';

export class BooksList {
  constructor() {
    console.log('BooksList');
    this.currentPage = [];
    // const booksList =     document.querySelector("#booksList");
    // const booksShown =    document.querySelector("#booksShown");
    // const booksFound =    document.querySelector("#booksFound");
  }

  addBooksList(page) {
    console.log(page.docs[0].id);
    page.docs.forEach(item => {
      item.id = item.key.split("/").pop();
    });
    console.log(page.docs[0].id);
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
    booksList.innerHTML += booksListHTML;
    booksShown.innerHTML = `Shown books: ${this.numShown(page)}`;
    booksFound.innerHTML = `Found books: ${page.numFound}`;
  }
  
  numShown(page) {
    const start = page.start;
    const pageSize = page.docs.length;
    let numberShownBooks;
    if (pageSize == 100) {
      numberShownBooks = start + 100;
    } else {
      numberShownBooks = start + pageSize;
    }
    return numberShownBooks;
  }
}
