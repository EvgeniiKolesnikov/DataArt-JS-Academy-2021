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
      if (this.LastSelect) {
        const LastSelect = this.searchResult
          .querySelector("#" + this.LastSelect.id);
        if (LastSelect) {
          LastSelect.classList.remove("select-book");
        }
      }
      this.LastSelect = selectBook;
      targetDiv.classList.add("select-book");

      // if (selectBook.title)
      //   this.bookInfo.innerHTML += `<h2>${selectBook.title}</h2>`; 
      // if (selectBook?.subtitle);
      //   this.bookInfo.innerHTML += `<h6>${selectBook.subtitle}</h6>`;
      // if (selectBook.language)
      //   this.bookInfo.innerHTML += `<div>Languages available: ${selectBook.language
      //   .map(item => `<span>${this.getFlagHTML(item)}</span> ${item}`)
      //   .join(", ")}</div>`;
      // if (selectBook.has_fulltext)
      //   this.bookInfo.innerHTML += `<div>Full text available: ${selectBook.has_fulltext}</div>`;
      // if (selectBook.first_publish_year)
      //   this.bookInfo.innerHTML += `<div>First publish year: ${selectBook.first_publish_year}</div>`;
      // if (selectBook.publish_year)
      //   this.bookInfo.innerHTML += `<div>Years published: ${selectBook.publish_year.join(", ")}</div>`;

      this.addBookInfoHTML('h3', 'book__title','', selectBook.title);
      this.addBookInfoHTML('h6', 'book__subtitle','', selectBook.subtitle);
      this.addBookInfoHTML
      ('div', 'book__lang', 'Languages available: ', selectBook.language);
      this.addBookInfoHTML
      ('div', 'book__fulltext','Full text available: ', selectBook.has_fulltext);
      this.addBookInfoHTML
      ('div', 'book__publish-first','First publish year: ', selectBook.first_publish_year);
      this.addBookInfoHTML
      ('div', 'book__publish-years','Years published: ', selectBook.publish_year);
      this.addBookInfoHTML
      ('div', 'book__publish-years','Years published: ', selectBook.author_alternative_name);
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
    const booksHTML = this.currentPage.reduce((acc, item) => {
      return (
        acc +
        `
          <div id="${item.id}" class="book-info">${item.title} ${item.author_name}</div>
        `
      );
    }, "");
    this.searchResult.innerHTML = booksHTML;
  }

  addBookInfoHTML(tag, className, text, prop) {
    if (`${typeof(prop)}` == 'undefined') {
      return;
    }
    if (`${typeof(prop)}` == 'object') {
      this.bookInfo.innerHTML +=
        `<${tag} class="${className}">${text}${prop
          .map(item => `<span>${this.getFlagHTML(item)}</span> ${item}`)
          .join(", ")}</${tag}>`;
    } else {
      this.bookInfo.innerHTML +=
        `<${tag} class="${className}">${text}${prop}</${tag}>`;
    }
    console.log(prop);
    console.log(`typeof(prop) = ${typeof(prop)}`);
    console.log(`prop.length = ${prop.length}`);
  }
  getFlagHTML(item) {
    console.log(item);
    console.log(item.length);
    if (typeof (item.length) == 'undefined') return ``;
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
    return `<img src="https://flagcdn.com/16x12/${item}.png"></img>`;
  }
  
}
