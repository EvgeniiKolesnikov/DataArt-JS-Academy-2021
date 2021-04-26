'use strict';

export class ToggleTheme {
  toggleButton;
  theme;
  constructor(storage) {    
    console.log('ToggleTheme');
    this.storage = storage;
    this.toggleButton = document.querySelector("#toggleThemeButton");
    this.toggleButton.addEventListener('click', e => this.toggleTheme());
    // localStorage.removeItem("myTheme");
    this.loadTheme();
  }

  loadTheme() {
    const myTheme = this.storage.get("myTheme");
    if (myTheme == 'light' || myTheme == null) {
      this.theme = 'light';
    }
    if (myTheme == 'dark') {
      this.theme = 'dark';
      document.documentElement.setAttribute('theme', 'dark');
    }
    // console.log(`myTheme = ${myTheme}`);
    // console.log(`this.theme = ${this.theme}`);
  }

  toggleTheme() {
    // console.log("Switching theme");
    // console.log(this.toggleButton.children[0].src);
    if (document.documentElement.hasAttribute('theme')) {
      document.documentElement.removeAttribute('theme');
      this.storage.set("myTheme", "light");
      // this.toggleButton.children[0].src = `./src/img/sun.png`;
    } else {
      document.documentElement.setAttribute('theme', 'dark');
      this.storage.set("myTheme", "dark");
      // this.toggleButton.children[0].src = "./src/img/moon.png";
    }
    this.storage.show("myTheme");
  }
}