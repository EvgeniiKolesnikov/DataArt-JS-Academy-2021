'use strict';

export class Storage {
  constructor() {
    console.log('Storage');

  }



  get(name) {
    // name = "myBooks", "myTheme"
    return JSON.parse(localStorage.getItem(name))
  }

  set(name, value) { 
    // "myBooks" = {[0,1,2]} 
    // "myTheme" = "dark"
    localStorage.setItem(name, JSON.stringify(value)); 
  }

  clear() {
    console.log('Clear storage');
    localStorage.clear(); 
  }

  show(name) {
    console.log(`${name} = ${this.get(name)}`);
  }
}
