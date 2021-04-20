export class BooksUI {
  searchResultHolder;
  bookInfoHolder;

  currentPage = [];

  api;

  constructor(api) {
    this.searchResultHolder = document.getElementById("searchResultHolder");
    this.bookInfoHolder = document.getElementById("bookInfoHolder");

    const searchInput = document.getElementById("searchInput");
    const goButton = document.getElementById("goButton");

    goButton.addEventListener("click", () => {
      const querry = searchInput.value;
      if (!querry) {
        return;
      }

      api.search(querry).then(page => {
        this.processSearchResult(page);
        console.log(page);
      });
    });

    this.searchResultHolder.addEventListener("click", e => {
      this.bookInfoHolder.innerHTML = ``;
      const targetDiv = e.target;
      const id = targetDiv.id;
      const selectBook = this.currentPage.find(item => item.id === id);
      // console.log(`selectBook = ${selectBook}`);
      if (!selectBook) {
        return;
      }
      if (this.LastSelect) {
        const LastSelect = this.searchResultHolder
          .querySelector("#"+this.LastSelect.id);
        if (LastSelect) {
          LastSelect.classList.remove("select-book");
        }
      }
      this.LastSelect = selectBook;
      targetDiv.classList.add("select-book");
      this.bookInfoHolder.innerHTML = ``;
      this.addBookInfoHTML(
        'h3', 'book__title','', selectBook.title);
      this.addBookInfoHTML(
        'h6', 'book__subtitle','', selectBook.subtitle);
      this.addBookInfoHTML(
        'div', 'book__lang','Languages available: ', selectBook.language);
      this.addBookInfoHTML(
        'div', 'book__fulltext','Full text available: ', selectBook.has_fulltext);
      this.addBookInfoHTML(
        'div', 'book__publish-first','First publish year: ', selectBook.first_publish_year);
      this.addBookInfoHTML(
        'div', 'book__publish-years','Years published: ', selectBook.publish_year);
    });
  }

  addBookInfoHTML(tag, cl, text, prop) {
    if (`${typeof(prop)}` == 'undefined') {
      return;
    }
    if (`${typeof(prop)}` == 'object') {
      this.bookInfoHolder.innerHTML +=
        `<${tag} class="${cl}">${text}${prop.join(", ")}</${tag}>`;
    } else {
      this.bookInfoHolder.innerHTML +=
        `<${tag} class="${cl}">${text}${prop}</${tag}>`;
    }
    console.log(`typeof(prop) = ${typeof(prop)}`);
    console.log(`prop.length = ${prop.length}`);
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

    this.searchResultHolder.innerHTML = booksHTML;
  }
}
