// DataArt JS 4 - Kolesnikov. E.A.
'use strict';

const API_URL = "https://jsonplaceholder.typicode.com/comments";
const postIdColors = {};

const appDiv = document.getElementById("app");

const inputWrapper = document.createElement("div");
inputWrapper.classList.add("input");
appDiv.appendChild(inputWrapper);

const commentsWrapper = document.createElement("div");
commentsWrapper.classList.add("comments");
appDiv.appendChild(commentsWrapper);

const addInput = () => {
  const inputHTML = 
    `<div class="input__box">
      <span class="input__icon">
        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
      </span>
      <input class="input__control" placeholder="Фильтр по e-mail" type="text" name="search" title="Фильтр по e-mail">
      <span class="input__clear" unselectable="on" title="Очистить">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path d="M14 .7l-.7-.7L7 6.3.7 0 0 .7 6.3 7 0 13.3l.7.7L7 7.7l6.3 6.3.7-.7L7.7 7z"/></svg>
      </span>
    </div>`
  inputWrapper.innerHTML = inputHTML;
  console.log('add inputHTML');
}
addInput();

const updateComments = (data, error) => {
  if (error) {
    const errorHTML = `<h1 class="comments__header">Error HTTP: ${error}</h1>`;
    commentsWrapper.innerHTML += errorHTML;
    return;
  }

  const dataComments = JSON.parse(JSON.stringify(data));
  const contentHTML = `
  <h2 class="comments__header">Comments</h2>
    <div class="comments__content">
      ${Object.keys(dataComments).map(key =>
      `<div class="comment" style="background-color:${fillBackgroungComment(dataComments[key].postId)}">
        <div class="comment__info">
          <div class="comments__postId">${dataComments[key].postId}</div>
          <div class="comments__email">${dataComments[key].email}</div>
          <div class="comments__id">${dataComments[key].id}</div>
        </div>
        <div class="comments__name">${dataComments[key].name}</div>
        <div class="comments__body">${dataComments[key].body}</div>
      </div>`
      ).join("")}
    </div>
  `;
  commentsWrapper.innerHTML += contentHTML;
};

function fillBackgroungComment (postId) {
  const value = postIdColors[`${postId}`];
  if (value === undefined) {
    postIdColors[`${postId}`] = getRandomColor();
    // console.log(`add new color = ${postId} : ${postIdColors[postId]}`);
  } else {
    // console.log(`exist color = ${postId} : ${postIdColors[postId]}`);
  }
  return postIdColors[`${postId}`]
}

function getRandomColor() {
  const intensity = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "a", "b", "c", "d"];
  let col1, col2, col3, col4, col5, col6;
  col1 = col3 = col5  = "f";
  col2 = intensity[Math.floor(Math.random() * intensity.length)];
  col4 = intensity[Math.floor(Math.random() * intensity.length)];
  col6 = intensity[Math.floor(Math.random() * intensity.length)];
  const randomColor = `#${col1}${col2}${col3}${col4}${col5}${col6}`;
  // console.log('randomColor = ', randomColor);
  return randomColor;
}

const getData = async () => {
  let response = await fetch(`${API_URL}`);
  if (response.ok) {
    let data = await response.json();
    // console.log(data);
    updateComments(data);
  } else {
    console.log("Error HTTP: " + response.status);
    updateComments(null, response.status);
  }
}
getData();
