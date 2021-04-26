'use strict';

import { Storage } from "./storage";

export class ReadList {
  books = [];
  storage = new Storage();

  constructor() {
    console.log('ReadList');

    this.readListBookCount = document.getElementById("readListBookCount");
    this.readListReadCount = document.getElementById("readListReadCount");
    this.readList = document.getElementById("readList");
    this.readListBook = document.getElementById("readListBook");
    this.readListRead = document.getElementById("readListRead");
  }
}