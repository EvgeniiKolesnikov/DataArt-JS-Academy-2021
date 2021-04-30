'use strict';

export class MenuController {

  constructor(data) {
    // console.log('MenuController');
    const onSearchListBtn =     document.querySelector("#onSearchListBtn");
    const onInfoListBtn =   document.querySelector("#onInfoListBtn");
    const onReadListBtn =   document.querySelector("#onReadListBtn");
    this.leftBlock =   document.querySelector("#leftBlock");
    this.centerBlock =   document.querySelector("#centerBlock");
    this.rightBlock =   document.querySelector("#rightBlock");
    
    // window.addEventListener(`resize`, e => {
    //   console.log(e.target.innerHeight);
    //   console.log(e.target.innerWidth);
    // }, false);

    onInfoListBtn.addEventListener('click', e => {
      console.log('onInfoListBtn');
      this.leftBlock.style.zIndex = 0;
      this.centerBlock.style.zIndex = 1;
      this.rightBlock.style.zIndex = 0;
    });

    onReadListBtn.addEventListener('click', e => {
      console.log('onReadListBtn');
      this.leftBlock.style.zIndex = 0;
      this.centerBlock.style.zIndex = 0;
      this.rightBlock.style.zIndex = 1;
    });

    onSearchListBtn.addEventListener('click', e => {
      console.log('onSearchListBtn');
      this.leftBlock.style.zIndex = 1;
      this.centerBlock.style.zIndex = 0;
      this.rightBlock.style.zIndex = 0;
    });
  }
}


