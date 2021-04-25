'use strict';
import { Api } from "./api";
import { BookCard } from "./book-card";
import { BooksList } from "./books-list";

export class LoadData {
  api = new Api();
  loadedPage = 0;
  countPages = 0;
  pageLoaded = false;
  currentPage = [];
  constructor() {
    console.log('LoadData');
    this.bookList = new BooksList();
    this.bookCard = new BookCard();
    this.querry = '';
  }

  getData(querry, page) {
    if (!querry) {
      return;
    }
    this.pageLoaded = false;
    this.querry = querry;
    this.loadedPage = page;
    if (page == 1)  {
      booksList.innerHTML = ``;
      this.currentPage.length = 0;
      spinnerBig.style.display = "block";
    } else if (page > 1) {
      spinnerMini.style.display = 'block';
    }
    this.api.searchBooksQuerry(querry, page).then(page => {
      this.currentPage = this.currentPage.concat(page.docs);
      this.bookCard.setCurrentPage(this.currentPage);
      this.bookList.addBooksList(page);
      this.getCountPages(page);
      this.pageLoaded = true;
      spinnerBig.style.display = "none";
      spinnerMini.style.display = 'none';
      console.log(this.currentPage);
    });
  }
  
  getCountPages(page) {
    const start = page.start;
    const numFound = page.numFound;

    // let countPages = Math.ceil(numFound/100);
    // console.log(countPages);
    this.countPages = Math.ceil(numFound/100);

    // let loadedPage = Math.ceil((start+100)/100);
    // console.log(loadedPage);
    this.loadedPage = Math.ceil((start+100)/100);
  }
  
  addData() {
    if (this.loadedPage < this.countPages) {
      // console.log('Add new data');
      this.pageLoaded = false;
      this.getData(this.querry, this.loadedPage+1)
      // console.log('новые данные ещё нужны');
    }
    if (this.loadedPage == this.countPages) {
      // console.log('новые данные не нужны');
    }
  }

}
