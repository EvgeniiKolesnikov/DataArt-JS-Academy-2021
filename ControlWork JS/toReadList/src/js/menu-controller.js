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
    
    window.addEventListener(`resize`, e => {
      console.log(e.target.innerHeight);
      console.log(e.target.innerWidth);
      // this.leftBlock.style.display = '';
      // this.centerBlock.style.display = '';
      // this.rightBlock.style.display = '';
    }, false);



    onInfoListBtn.addEventListener('click', e => {
      console.log('onInfoListBtn');

      this.centerBlock.style.zIndex = 0;
      this.rightBlock.style.zIndex = -10;

    });

    onReadListBtn.addEventListener('click', e => {
      console.log('onReadListBtn');
      this.centerBlock.style.zIndex = -10;
      this.rightBlock.style.zIndex = 0;

      // if (this.rightBlock.style.display == 'none' || this.rightBlock.style.display == '') {
      //   this.rightBlock.style.display = 'block';
      //   // this.centerBlock.style.display = 'none';
      // } 
    });

  }
}


