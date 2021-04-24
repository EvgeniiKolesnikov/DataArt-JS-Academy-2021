'use strict';
export class BookInfo {
  constructor() {
    this.bookInfoHeader = document.getElementById("bookInfoHeader");
    this.bookInfoProps = document.getElementById("bookInfoProps");
  }

  setBookInfo(book) {
    this.bookInfoHeader.innerHTML = ``;
    this.bookInfoProps.innerHTML = ``;
    // this.bookInfoProps.innerHTML += book.title ? `<h2 class="book-info__title">${book.title}</h2>` : ``; // var 3
    // book.title && (this.bookInfoProps.innerHTML += `<h3 class="book-info__title">${book.title}</h3>`);   // var 2
    this.bookInfoHeader.innerHTML += `<h2 class="book-info__title">${book.title}</h2>`;                     // var 1
    if (book.subtitle) {
      this.bookInfoProps.innerHTML += `<h3 class="book-info__subtitle">${book.subtitle}</h3>` 
    }
    this.bookInfoProps.innerHTML += `<img class="book-info__img" id="bookPicture"></img>`; 
    if (book.isbn) {
      this.loadBookImage(book);
    }
    this.addPropsHtml(`Author:`, book.author_name?.join(", "));
    this.addPropsHtml(`Languages available:`, book.language
      ?.map(item => this.getFlagHTML(item) + item)
      .join(", "));
    this.addPropsHtml(`Full text available:`, book.has_fulltext);
    this.addPropsHtml(`First publish year:`, book.first_publish_year);
    this.addPropsHtml(`Years published:`, book.publish_year?.join(", "));
  }

  addPropsHtml(propTitle, bookKey) {
    if (bookKey) {
      this.bookInfoProps.innerHTML +=  
      `<div class="book-info__prop">
        <span class="book-info__prop-title">${propTitle}</span>
        <span class="book-info__prop-value">${bookKey}</span>
      </div>`
    }
  }

  async loadBookImage(book) {
    try {
      let url = `http://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg?default=false`;
      let response = await fetch(`${url}`, {mode: 'cors'});
      if (response.ok) {
        let content = await response.blob();
        let objectURL = URL.createObjectURL(content);
        let bookPicture = document.getElementById('bookPicture');
        if (bookPicture.src === '') {
          bookPicture.src = objectURL;
        }
      } else {
        console.error(`HTTP status: error ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  getFlagHTML(item) {
    // console.log(item);
    if (item == 'eng') item = 'gb';
    if (item == 'rus') item = 'ru';
    if (item == 'spa') item = 'es';
    if (item == 'ger') item = 'de';
    if (item == 'chi') item = 'cn';
    if (item == 'ukr') item = 'ua';
    if (item == 'fre') item = 'fr';
    if (item == 'ita') item = 'it';
    if (item == 'jpn') item = 'jp';
    if (item == 'por') item = 'pt';
    if (item == 'iri') item = 'ie';
    if (item == 'alb') item = 'al';
    if (item == 'scc') item = 'rs';
    if (item.length > 2) return ``;
    return `<img class="book-info__flag" src="https://flagcdn.com/16x12/${item}.png"></img> `;
  }
}