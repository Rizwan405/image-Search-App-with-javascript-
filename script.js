let pageNumber = 1;
const perPage = 30;
const inputEl = document.querySelector(".input-text");
const loadBtn = document.querySelector(".load-btn");
const filterBtns = document.querySelectorAll(".filter-btn");
let res = "";
filterBtns.forEach((el) => {
  el.addEventListener("click", function () {
    res = el.getAttribute("data-filter");
    console.log(res);
    document.querySelector(".parent").innerHTML = "";
    filterQuery(res);
  });
});
function updateUI(data) {
  data.results.map((el) => {
    const html = `
       <div class="img-wrapper">
         <img
           class="img"
           src="${el.links.download}"
           alt="${el.alt_description}"
         />
         <p class="description">${el.alt_description}</p>
         <div class="overlay"></div>
       </div>`;
    document.querySelector(".parent").insertAdjacentHTML("beforeend", html);
  });
  if (data.results.length >= 1) {
    loadBtn.style.display = "block";
    loadBtn.style.textAlign = "center";
  }
}
document.querySelector(".btn").addEventListener("click", function () {
  document.querySelector(".parent").innerHTML = "";
  res = inputEl.value;
  console.log(res);
  if (!res) return;
  filterQuery(res);
  inputEl.value = "";
});
function filterQuery(filter = "", pageNumber = 1) {
  const response = fetch(
    `https://api.unsplash.com/search/photos?query=${filter}&page=${pageNumber}&per_page=${perPage}&client_id=Z06N52R1hCUtJH8OLnr82zjhvGc-z1oj3vFtDF6piP0`
  );
  response
    .then((resp) => {
      if (!resp.ok) {
        throw Error("network issue try later");
      } else {
        return resp.json();
      }
    })
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      document.querySelector(".error").textContent = err;
    });
}
//adding functionality to button
//refactoring the duplicate code
// fetch function repeat
loadBtn.addEventListener("click", function () {
  pageNumber++;
  filterQuery(res, pageNumber);
});
//adding functionality to buttons
