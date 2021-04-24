'use strict';
import { Api } from "./api";
import { BookCard } from "./book-card";
import { BookInfo } from "./book-info";
import { LoadData } from "./loadData";

export class Search {

  currentPage = [];
  bookCard = new BookCard();
  loadData = new LoadData();
  constructor() {
    // const api = new Api();
    // const booksList =     document.querySelector("#booksList");
    // const searchInput =   document.querySelector("#searchInput");
    // const searchClear =   document.querySelector("#searchClear");
    // const searchButton =  document.querySelector("#searchButton");
    // const spinnerBig =    document.querySelector("#spinnerBig");

    searchButton.addEventListener("click", (e) => this.loadData.getData(searchInput.value));
    searchInput.addEventListener("keyup", (e) => {
      if(e.code === 'Enter') {
        this.loadData.getData(searchInput.value);
      }
    });

    searchInput.addEventListener("input", (e) => (this.onChangeInput(e)));
    searchClear.addEventListener("click", (e) => (this.onClickClear(e)));

    }

  onChangeInput(e) {
    searchClear.style.display = (e.currentTarget.value == "" || undefined) ? 'none' : 'block';
    // this.loadData.getData(e.currentTarget.value);
  }
  
  onClickClear(e) {
    searchInput.value = "";
    e.currentTarget.style.display = 'none';
    // booksList.innerHTML = ``;
  }
}