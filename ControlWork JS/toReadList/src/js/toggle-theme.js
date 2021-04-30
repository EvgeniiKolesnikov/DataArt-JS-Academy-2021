'use strict';

export class ToggleTheme {
  theme;
  constructor(storage) {    
    // console.log('ToggleTheme');
    this.storage = storage;
    toggleThemeButton.addEventListener('click', e => this.toggleTheme());
    // localStorage.removeItem("myTheme");
    this.loadTheme();
  }

  loadTheme() {
    const myTheme = this.storage.get("myTheme");
    if (myTheme == 'light' || myTheme == null) {
      this.theme = 'light';
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    }
    if (myTheme == 'dark') {
      this.theme = 'dark';
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
      document.documentElement.setAttribute('theme', 'dark');
    }
  }

  toggleTheme() {
    // console.log(this.toggleButton.children[0].src);
    if (document.documentElement.hasAttribute('theme')) {
      document.documentElement.removeAttribute('theme');
      this.storage.set("myTheme", "light");
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
      // this.toggleButton.children[0].src = "./src/img/sun.png";
    } else {
      document.documentElement.setAttribute('theme', 'dark');
      this.storage.set("myTheme", "dark");
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
      // this.toggleButton.children[0].src = "./src/img/moon.png";
    }
    this.storage.show("myTheme");
  }
}