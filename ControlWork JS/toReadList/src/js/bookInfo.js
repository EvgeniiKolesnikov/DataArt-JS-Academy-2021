export class BookInfo {
  bookInfo;

  constructor() {
    this.bookInfo = document.getElementById("bookInfo");
  }

  setBookInfo(book) {
    this.bookInfo.innerHTML = ``;
    // this.bookInfo.innerHTML += book.title ? `<h3 class="book__title">${book.title}</h3>` : ``; 
    // book.title && (this.bookInfo.innerHTML += `<h3 class="book__title">${book.title}</h3>`);
    if (book.title) {
      this.bookInfo.innerHTML += `<h3 class="book__title">${book.title}</h3>`; 
    }
    if (book.subtitle) {
      this.bookInfo.innerHTML += `<h6 class="book__subtitle">${book.subtitle}</h6>` 
    }
    if (book.isbn) {
      this.bookInfo.innerHTML += `<div class="book__picture" id="bookPicture"></div>`; 
      this.getBookImageHTML(book.isbn)
    }
    if (book.language) {
      this.bookInfo.innerHTML += `<div class="book__lang">Languages available: ${book.language
        .map(item => `${this.getFlagHTML(item)} ${item}`)
        .join(", ")}</div>`
    }
    if (book.has_fulltext) {
      this.bookInfo.innerHTML += `<div class="book__fulltext">Full text available: ${book.has_fulltext}</div>`
    }
    if (book.first_publish_year) {
      this.bookInfo.innerHTML += `<div class="book__publish-first">First publish year: ${book.first_publish_year}</div>`
    }
    if (book.publish_year) {
      this.bookInfo.innerHTML += `<div class="book__publish-years">Years published: ${book.publish_year?.join(", ")}</div>`
    }
  }
  async getBookImageHTML(isbn) {
    try {
      let url = `http://covers.openlibrary.org/b/isbn/${isbn[0]}-M.jpg?default=false`;
      let response = await fetch(`${url}`);
      if (response.ok) {
        let content = await response.blob();
        let objectURL = URL.createObjectURL(content);
        let bookPicture = document.getElementById('bookPicture');
        if (bookPicture.childNodes.length === 0) {
          bookPicture.innerHTML += `<img class="book__img" src="${objectURL}"></img>`; 
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
    return `<img class="book__flag" src="https://flagcdn.com/16x12/${item}.png"></img>`;
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