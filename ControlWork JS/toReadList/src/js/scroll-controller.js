'use strict';

export class ScrollController {
  canAddData = true;
  isLoadedNewData = false;
  constructor(data) {
    // console.log('ScrollController');
    // console.log(data);
    this.data = data;
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
      if (this.canAddData && this.data.pageLoaded) {
        this.data.addData();
      } 
    }
  }
}