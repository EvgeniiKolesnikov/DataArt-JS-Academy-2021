'use strict';
import { Api } from "./api";
import { BookCard } from "./book-card";
import { BookInfo } from "./book-info";
import { LoadData } from "./loadData";

export class SearchController {

  currentPage = [];
  bookCard = new BookCard();
  loadData = new LoadData();
  constructor() {
    const data = this.loadData;
    // const api = new Api();
    // const booksList =     document.querySelector("#booksList");
    // const searchInput =   document.querySelector("#searchInput");
    // const searchClear =   document.querySelector("#searchClear");
    // const searchButton =  document.querySelector("#searchButton");
    // const spinnerBig =    document.querySelector("#spinnerBig");
    const debounce = (callback, delay = 250) => {
      let timeoutId
      return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          timeoutId = null
          this.loadData.getData(searchInput.value);
          callback(...args)
        }, delay)
      }
    }
    const debouncedGreet = debounce(this.onChangeInput, 777);
    searchInput.addEventListener("keyup", (e) => debouncedGreet(e));
    searchButton.addEventListener("click", (e) => this.loadData.getData(searchInput.value));
    searchClear.addEventListener("click", (e) => (this.onClickClear(e)));
    searchInput.addEventListener("keyup", (e) => {
      searchClear.style.display = (e.path[0].value == "" || undefined) ? 'none' : 'block';
      if(e.code === 'Enter') {
        console.log(this.loadData);
        this.loadData.getData(searchInput.value);
      }
    });
  }

  onChangeInput(e) {
    console.log(`after 777 ms. loadData(Value) = ${e.target.value}`);
  }
  
  onClickClear(e) {
    searchInput.value = "";
    e.currentTarget.style.display = 'none';
    // booksList.innerHTML = ``;
  }

}


