'use strict';

export class ToggleTheme {
  toggleButton;
  constructor() {
    this.toggleButton = document.querySelector("#toggleThemeButton");
    // get local storage 
    // will be here
    this.toggleButton.addEventListener('click', e => this.toggleTheme());
  }

  toggleTheme() {
    // console.log("Switching theme");
    // console.log(this.toggleButton.children[0].src);
    if (document.documentElement.hasAttribute('theme')) {
      document.documentElement.removeAttribute('theme');
      // this.toggleButton.children[0].src = `./src/img/sun.png`;
    } else {
      document.documentElement.setAttribute('theme', 'dark');
      // this.toggleButton.children[0].src = "./src/img/moon.png";
    }
  }
}