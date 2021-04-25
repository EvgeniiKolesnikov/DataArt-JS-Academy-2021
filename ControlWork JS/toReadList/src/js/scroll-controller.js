'use strict';

export class ScrollController {
  canAddData = true;
  isLoadedNewData = false;
  constructor(loadData) {
    console.log('ScrollController');
    // console.log(loadData);
    this.loadData = loadData;
    const scrollBooksList = document.querySelector('#scrollBooksList');
    const spinnerMini = document.querySelector('#spinnerMini');
    scrollBooksList.addEventListener("scroll", (e) => {
      this.isScrolledIntoView(scrollBooksList);
    });
  }

  isScrolledIntoView(scroll) {
    let docViewTop = scroll.scrollTop; 
    let docViewBottom = docViewTop + scroll.offsetHeight;
    let scrollHeigh = scroll.scrollHeight;
    if (docViewBottom + 100 >= scrollHeigh) {
      // scroll in target bottom
      if (this.canAddData && this.loadData.pageLoaded) {
        this.loadData.addData();
      } 
    }
  }
}