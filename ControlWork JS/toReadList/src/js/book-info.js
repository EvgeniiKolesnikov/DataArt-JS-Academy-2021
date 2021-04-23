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
    // this.bookInfo.innerHTML += book.title ? `<h3 class="book-info__title">${book.title}</h3>` : ``; 
    // book.title && (this.bookInfo.innerHTML += `<h3 class="book-info__title">${book.title}</h3>`);
    if (book.title) {
      this.bookInfoHeader.innerHTML += `<h3 class="book-info__title">${book.title}</h3>`; 
    }
    if (book.subtitle) {
      this.bookInfoHeader.innerHTML += `<h6 class="book-info__subtitle">${book.subtitle}</h6>` 
    }
    if (book.isbn) {
      this.bookInfo.innerHTML += `<img class="book-info__img" id="bookPicture" src=""></img>`; 
      this.loadBookImage(book.isbn)
    }

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

  async loadBookImage(isbn) {
    try {
      let url = `http://covers.openlibrary.org/b/isbn/${isbn[0]}-M.jpg?default=false`;
      let response = await fetch(`${url}`, {mode: 'cors'});
      if (response.ok) {
        let content = await response.blob();
        let objectURL = URL.createObjectURL(content);
        let bookPicture = document.getElementById('bookPicture');
        // console.log(bookPicture.src);
        bookPicture.src = objectURL;
        // if (bookPicture.childNodes.length === 0) {
        //   bookPicture.innerHTML += `<img class="book-info__img" src="${objectURL}"></img>`; 
        // }
        // if (bookPicture.childNodes.length === 0) {
        //   bookPicture.innerHTML += `<img class="book-info__img" src="${objectURL}"></img>`; 
        // }
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

// http://covers.openlibrary.org/b/id/240727-S.jpg
// http://covers.openlibrary.org/b/olid/OL7440033M-S.jpg
// http://covers.openlibrary.org/b/isbn/0385472579-S.jpg
// http://covers.openlibrary.org/b/isbn/9780385472579-S.jpg
// http://covers.openlibrary.org/b/lccn/93005405-S.jpg
// http://covers.openlibrary.org/b/oclc/28419896-S.jpg
// http://covers.openlibrary.org/b/goodreads/979250-S.jpg
// http://covers.openlibrary.org/b/librarything/192819-S.jpg