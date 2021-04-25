'use strict';
export class ScrollController {
  bookInfoHeader;
  bookInfo;
  count = 0;

  constructor() {
    const scrollBooksList = document.querySelector('#scrollBooksList');
    const spinnerMini = document.querySelector('#spinnerMini');
    scrollBooksList.addEventListener("scroll", (e) => {
      // console.log(e);
      this.isScrolledIntoView(scrollBooksList);
    });
  }

  isScrolledIntoView(scroll) {
    // console.log(`=== ${this.count++} ===`);
    let docViewTop = scroll.scrollTop; 
    let docViewBottom = docViewTop + scroll.offsetHeight;
    let scrollHeigh = scroll.scrollHeight; 
    // console.log(`docViewTop = ${docViewTop}`);
    // console.log(`docViewBottom = ${docViewBottom}`);
    // console.log(`scrollHeigh = ${scrollHeigh}`);
    if (docViewBottom + 100 >= scrollHeigh) {
      console.log('load new data');
      spinnerMini.style.display = 'block';
    }
  }
}