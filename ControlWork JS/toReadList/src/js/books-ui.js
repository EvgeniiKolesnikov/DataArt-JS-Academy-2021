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
      this.bookInfoHolder.innerHTML = `<h2>${selectBook.title}</h2>`;
      if (selectBook.language) {
        // console.log(selectBook.language);
        this.bookInfoHolder.innerHTML += `
          <div>Languages available: ${selectBook.language.join(", ")}</div>
        `;
      }
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

    this.searchResultHolder.innerHTML = booksHTML;
  }
}
