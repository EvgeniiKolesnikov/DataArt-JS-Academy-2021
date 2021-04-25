'use strict';
export class Api {
  #apiUrlSearch = `https://openlibrary.org`;
  #apiUrlImage = `http://covers.openlibrary.org`;
  #imageSize = `L`;

  async searchBooks(fullQuerry) {
    const url = `${this.#apiUrlSearch}/search.json?${fullQuerry}`;
    try {
      const response = await fetch(url, {mode: 'cors'});
      if (response.ok) {
        return await response.json();
      }
      console.error(`Request ${url} failed with ${response.status}`)
    } catch (error) {
      console.error(`Request ${url} failed with error`, error)
    }
  }

  async searchBooksQuerry(querry, page) {
    const url = `${this.#apiUrlSearch}/search.json?q=${querry}&page=${page}`;
    try {
      const response = await fetch(url, {mode: 'cors'});
      if (response.ok) {
        return await response.json();
      }
      console.error(`Request ${url} failed with ${response.status}`)
    } catch (error) {
      console.error(`Request ${url} failed with error`, error)
    }
  }

  async searchBookImage(book) {
    const url = `${this.#apiUrlImage}/b/isbn/${book}-${this.#imageSize}.jpg?default=false`;
    try {
      let response = await fetch(`${url}`, {mode: 'cors'});
      if (response.ok) {
        return await response.blob()
      }
      console.error(`Request ${url} failed with ${response.status}`)
    } catch (error) {
      console.error(`Request ${url} failed with error`, error)
    }
  }
}
