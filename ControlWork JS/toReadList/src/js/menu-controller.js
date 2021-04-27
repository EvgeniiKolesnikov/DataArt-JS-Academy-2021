'use strict';

export class MenuController {

  constructor(data) {
    console.log('MenuController');
    const onSearchListBtn =     document.querySelector("#onSearchListBtn");
    const onInfoListBtn =   document.querySelector("#onInfoListBtn");
    const onReadListBtn =   document.querySelector("#onReadListBtn");
    this.leftBlock =   document.querySelector("#leftBlock");
    this.centerBlock =   document.querySelector("#centerBlock");
    this.rightBlock =   document.querySelector("#rightBlock");
    

    onReadListBtn.addEventListener('click', e => {
      console.log('onReadListBtn');
      if (this.rightBlock.style.display == 'none') {
        this.rightBlock.style.display = 'block';
      } else {
        this.rightBlock.style.display = 'none'
      }
      
    });

    onInfoListBtn.addEventListener('click', e => {
      console.log('onInfoListBtn');
      if (this.centerBlock.style.display == 'none') {
        this.centerBlock.style.display = 'block';
      } else {
        this.centerBlock.style.display = 'none'
      }
      

    });
  }
}


