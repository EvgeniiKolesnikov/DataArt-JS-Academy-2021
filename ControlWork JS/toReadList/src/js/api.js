'use strict';
export class Api {
  async search(querry, page) {
    const url = `https://openlibrary.org/search.json?q=${querry}&page=${page}`;
    const result = await fetch(url, {mode: 'cors'});
    return await result.json();
  }
}
