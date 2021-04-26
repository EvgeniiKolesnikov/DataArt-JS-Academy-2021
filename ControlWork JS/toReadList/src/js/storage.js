'use strict';

import { ReadList } from "./read-list";

export class Storage {
  constructor() {
    // const readList = new ReadList();
    console.log('Storage');
    // this.readList = new readList();
    this.loadReadList();
  }

  loadReadList() {

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
    console.log(`${name} = `, this.get(name));
  }

}
