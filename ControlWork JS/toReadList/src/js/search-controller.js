'use strict';

export class SearchController {
  constructor(data) {
    // console.log('SearchController');
    this.data = data;
    // const booksList =     document.querySelector("#booksList");
    // const searchInput =   document.querySelector("#searchInput");
    // const searchClear =   document.querySelector("#searchClear");
    // const searchButton =  document.querySelector("#searchButton");
    const debounce = (callback, delay = 250) => {
      let timeoutId
      return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          timeoutId = null
          data.getData(searchInput.value, 1);
          callback(...args)
        }, delay)
      }
    }
    const debouncedGreet = debounce(this.onChangeInput, 777);
    searchInput.addEventListener("keyup", (e) => debouncedGreet(e));
    searchButton.addEventListener("click", (e) => this.data.getData(searchInput.value, 1));
    searchClear.addEventListener("click", (e) => (this.onClickClear(e)));
    searchInput.addEventListener("keyup", (e) => {
      let value = e.path[0].value;
      searchClear.style.display = (value == "" || undefined) ? 'none' : 'block';
      if(e.code === 'Enter') {
        this.data.getData(searchInput.value, 1);
      }
      if(e.code === 'Backspace' && value == "") {
        this.onClearBooksList();
      }
    });
    searchInput.focus();
  }

  onChangeInput(e) {
    // console.log(`after 777 ms. data(Value) = ${e.target.value}`);
  }
  
  onClickClear(e) {
    searchInput.value = "";
    e.currentTarget.style.display = 'none';
    this.onClearBooksList();
  }

  onClearBooksList() {
    addToReadButton.style.display = 'none';
    booksList.innerHTML = ``;
    bookInfoHeader.innerHTML = ``;
    bookInfoProps.innerHTML = ``;
    booksShown.innerHTML = `Shown books: 0`;
    booksFound.innerHTML = `Found books: 0`;
  }
}


