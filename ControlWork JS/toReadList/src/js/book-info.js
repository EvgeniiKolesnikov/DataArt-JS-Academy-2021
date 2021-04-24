'use strict';
export class BookInfo {
  bookInfoHeader;
  bookInfo;

  constructor() {
    this.bookInfoHeader = document.getElementById("bookInfoHeader");
    this.bookInfo = document.getElementById("bookInfo");
  }

  setBookInfo(book) {
    this.bookInfo.innerHTML = ``;
    this.bookInfoHeader.innerHTML = ``;
    // this.bookInfo.innerHTML += book.title ? `<h2 class="book-info__title">${book.title}</h2>` : ``; 
    // book.title && (this.bookInfo.innerHTML += `<h3 class="book-info__title">${book.title}</h3>`);
    if (book.title) {
      this.bookInfoHeader.innerHTML += `<h2 class="book-info__title">${book.title}</h2>`; 
    }
    if (book.subtitle) {
      this.bookInfo.innerHTML += `<h3 class="book-info__subtitle">${book.subtitle}</h3>` 
    }
    
    this.bookInfo.innerHTML += `<img class="book-info__img" id="bookPicture"></img>`; 
    this.loadBookImage(book);

    this.addPropsHtml(`Languages available:`, book.language
      ?.map(item => this.getFlagHTML(item) + item)
      .join(", "));
    this.addPropsHtml(`Full text available:`, book.has_fulltext);
    this.addPropsHtml(`First publish year:`, book.first_publish_year);
    this.addPropsHtml(`Years published:`, book.publish_year?.join(", "));
  }

  addPropsHtml(propTitle, bookKey) {
    if (bookKey) {
      this.bookInfo.innerHTML +=  
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
    if (item.length > 2) return ``;
    return `<img class="book-info__flag" src="https://flagcdn.com/16x12/${item}.png"></img> `;
  }
}