const API_URL = "https://api.exchangeratesapi.io";
const BASE_RATE = "RUB";

const appDiv = document.getElementById("app");
const btnsWrapper = document.createElement("div");
const contentWrapper = document.createElement("div");
appDiv.appendChild(btnsWrapper);
appDiv.appendChild(contentWrapper);

// formatting https://stackoverflow.com/a/3605248/1061438
const zeroFormat = num => ("0" + num).slice(-2);

const dates = new Array(7).fill(0).map((item, num) => {
  const date = new Date();
  date.setDate(date.getDate() - num);
  return date;
});
console.log(dates);

const datesFormatted = dates.map(
  date =>
    `${date.getFullYear()}-${zeroFormat(date.getMonth() + 1)}-${zeroFormat(
      date.getDate()
    )}`
);
console.log(datesFormatted);

const updateGrid = ({ date, base, rates }) => {
  const contentHTML = `
    Base: ${base}<br />
    Date: ${date}<br />
    <table>
    <thead>
      <tr>
        <th>Code</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      ${rates
        .map(
          rate => `
            <tr>
              <td>${rate.code}</td>
              <td>${rate.value}</td>
            </tr>
          `
        )
        .join("")}
    </tbody>
    </table>
  `;

  contentWrapper.innerHTML = contentHTML;
};

const updateGridTmp = data => {
  // parse & prepare data
  const rates = Object.keys(data.rates).map(code => ({
    code,
    value: data.rates[code]
  }));
  const { date, base } = data;
  updateGrid({ date, base, rates });
}

const fetchAndUpdate = dateFormatted =>
  fetch(`${API_URL}/${dateFormatted}?base=${BASE_RATE}`)
    .then(data => data.json())
    .then(updateGridTmp);

const btnsHtml = datesFormatted
  .reverse()
  .map(
    dateFormatted =>
      `<button data-date='${dateFormatted}'>${dateFormatted}</button>`
  )
  .join("");
btnsWrapper.innerHTML = btnsHtml;

/*******************/

btnsWrapper.addEventListener("click", ({ target }) => {
  fetchAndUpdate(target.getAttribute("data-date"));
});
fetchAndUpdate(datesFormatted[datesFormatted.length - 1]);