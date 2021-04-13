console.log('Hi, man. It.s tracing script');

const trackList = [];
const trackTagsArray = ['BUTTON'];
const ignoreIds = [];
let trackBox;
let loadDataBtn;
let clearDataBtn;
let globalDom;
document.addEventListener('click', (e) => trackElement(e));

function addTrackList() { 
  trackBox = document.createElement('div');
  trackBox.classList.add("trackBox");
  trackBox.id = "trackBox";
  const body = document.getElementsByTagName('body')[0];
  // console.log(body);
  body.appendChild(trackBox);
  trackBox.innerHTML = `
  <div class="container"><h6>Tracking List</h6>
    <button id="loadData" type="button" class="btn btn-outline-secondary btn-sm" data-ignore="true">Load data</button>
    <button id="clearData" type="button" class="btn btn-outline-secondary btn-sm" data-ignore="true">Clear data</button>
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>Tag</th>
          <th>Id</th>
          <th>Text</th>
          <th>Time</th>
          <th>The way DOM up</th>
        </tr>
      </thead>
      <tbody id="trackBox__list">
        
      </tbody>
    </table>
  </div>`;
  addEvents(); 
}
addTrackList();

function addEvents() {
  loadDataBtn = document.querySelector('#loadData');
  loadDataBtn.addEventListener('click', e => loadData(e));
  clearDataBtn = document.querySelector('#clearData');
  clearDataBtn.addEventListener('click', e => clearData(e));
}

function loadData() {
  console.log('load data');
  let trackBox__list = document.querySelector('#trackBox__list');
  trackBox__list.innerHTML = `
    ${Object.keys(trackList).map(item => 
      `<tr>
        <td>${trackList[item].tag}</td>
        <td>${trackList[item].id}</td>
        <td>${trackList[item].text}</td>
        <td>${trackList[item].time}</td>
        <td>${trackList[item].wayDOM}</td>
      </tr>` 
    ).join("")}
  `
}

function clearData() {
  console.log('clear data');
  let trackBox__list = document.querySelector('#trackBox__list');
  trackList.length = 0;
  loadData();

}

function trackElement(e) {
  let item = e.target;
  // console.log(item);
  // console.log('data-ignore = ', item.dataset.ignore);
  if (trackTagsArray.indexOf(item.tagName) != -1 && !item.dataset.ignore) {
    // console.log('Мы мониторим клики на этот элемент - ' + item.tagName);
    let wayDom = item.id;
    findWay(item, wayDom);
    console.log(globalDom);
    trackList.push({
      tag: item.tagName,
      id: item.id,
      time: Date(),
      text: item.textContent,
      wayDOM: globalDom
    });
  }
}

function findWay(item, wayDom) {
  let way = item.parentNode;
  wayDom += ` => ${way.tagName}`;
  // console.log('way = ', way.tagName, 'wayDom = ', wayDom);
  if (way.tagName=="HTML") {
    console.log('HTML finded');
    console.log(wayDom);
    globalDom = wayDom;
    return;
  }
  findWay(way, wayDom);
}

// Add more tags to track
function addTagToTrack(...tag) {
  trackTagsArray.push(...tag);
}
addTagToTrack('IMG','INPUT','A');
