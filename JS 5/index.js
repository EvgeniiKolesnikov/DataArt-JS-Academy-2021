console.clear();
// Kolesnikov E.A. - JS 5 
// =====================================================

const links = document.querySelector('#links-box');
const inputText = document.querySelector('#input-box__text');
const inputAdd = document.querySelector('#input-box__add');

links.addEventListener("mousedown", (e) => mousedownLinks(e));
inputText.addEventListener("keydown", (e) => { if (e.code == 'Enter') addLink()});
inputAdd.addEventListener("click", (e) => addLink());

function addLink() {
  let link = inputText.value;
  let firstDot = link.indexOf('.');
  let lastDot = link.lastIndexOf('.');
  if (firstDot > 0 && lastDot < link.length - 1) {
    // correct link
    console.log('correct link');
    links.innerHTML += `<div id="link" class="btn-group btn-group-justified text-muted pb-1 w-100">
      <button id="link__button" type="button" 
      onclick="window.open('https://www.${link}')"
      value="Go to ${link}"
      class="btn btn-outline-warning btn-sm btn-block col-11">
        <a id="link__link" href="https://www.${link}" class="card-link" target="_blank">${link}</a></button>
      <button id="link__delete"class="btn btn-outline-danger btn-sm" type="button">Delete</button>
    </div>`
    // inputText.value = "";
    // e.currentTarget.style.display = 'none';
  } else {
    console.log('Incorrect link');
  }
}

function mousedownLinks(e) {
  // console.log(e.currentTarget); // #links-box
  console.log(e.target);
  if (e.target.id == 'link__delete') {
    console.log('delete');
    e.target.parentElement.remove();
  }
}




