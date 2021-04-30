'use strict';

import { ReadList } from "./read-list";

export class Storage {
  constructor() {
    // console.log('Storage');
    // this.clear();
    this.readList = new ReadList();
    this.refresh();
  }

  refresh() {
    this.readList.loadReadList(this);
  }


  get(name) {
    // name = "myBooks", "myTheme"
    return JSON.parse(localStorage.getItem(name))
  }

  set(name, value) { 
    // "myBooks" = [{},{},{}]
    // "myTheme" = "dark"
    localStorage.setItem(name, JSON.stringify(value)); 
    this.refresh();
  }

  clear() {
    console.log('Clear storage');
    localStorage.clear(); 
  }

  show(name) {
    // console.log(`${name} = `, this.get(name));
  }

}
