'use strict';
import skin from './../img/skin.png';

// import url from "file!./file.png"
// import image from '/../src/img/skin.png';
export class BooksList {
  constructor() {
    // console.log('BooksList');
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
    const blueBook = `https://www.clker.com/cliparts/c/f/n/A/k/T/book-th.png`;
    const redBook = `https://www.clker.com/cliparts/U/a/w/s/n/V/c-users-public-pictures-sample-pictures-th.png`;

    const booksListHTML = this.currentPage.reduce((acc, item) => {
      return (acc +
        `<div id="${item.id}" class="book-card">
          <div class="book-card__container">

            <img class="book-card__img" src="${item.cover_i 
            ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg?default=false` 
              : `${item.isbn 
                ? `https://covers.openlibrary.org/b/isbn/${item.isbn[0]}-L.jpg?default=false`
              : `${skin}`}`
            }" onError="this.src='${skin}'">
            <div class="book-card__header">
              <span class="book-card__title">${item.title}</span> 
              ${item.language ? `<span class="book-card__lang">${item.language.join(", ")}</span>` : ``}
              ${item.subtitle ? `<div class="book-card__subtitle">${item.subtitle}</div>` : ``}
            </div> 
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
