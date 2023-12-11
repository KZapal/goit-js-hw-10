import Notiflix from "notiflix";
import axios from "axios";
import { fetchCatByBreed, fetchBreeds } from "./js/catapi.js";

const select = document.querySelector(`.breed-select`);
const loader = document.querySelector(`.loader`);
const error = document.querySelector(`.error`);
const info = document.querySelector(`.cat-info`);

axios.defaults.headers.common["x-api-key"] =
  "live_6t0elxdjoziIG9cxE7fOyiyIhgPn5hu1qZhJ8DzemG6orAnpFLSFelUoTLGEFqmd";
axios.defaults.baseURL = "https://api.thecatapi.com/v1";

loader.style.display = `none`;
error.style.display = `none`;
function showLoader() {
  loader.innerText = "";
  loader.style.display = "block";
}
hidenLoader();
error.style.display = "none";

function hidenLoader() {
  loader.style.display = "none";
}

fetchBreeds()
  .then((data) => {
    const html = data.map(
      (breed) => `<option value="${breed.id}">${breed.name}</option>`
    );
    select.innerHTML = html;
  })
  .catch((error) => {
    hidenLoader();
    error.style.display = "block";
    Notiflix.Report.failure("Error", error.textContent);
  })
  .finally(() => {
    console.log("fetch Breeds has ended");
  });

select.addEventListener("change", (ev) => {
  info.style.display = "none";
  showLoader();

  const breed = ev.target.value;

  fetchCatByBreed(breed)
    .then((response) => {
      return response.data;
    })
    .then((cats) => {
      info.style.display = `flex`;

      const array = cats.map(
        (cat) =>
          `<div class="content"><img src="${cat.url}" class="cat-img"></img><div class="text-content"><h2 class="cat-name">${cat.breeds[0].name}</h2><p class="description">${cat.breeds[0].description}</p> <p><b>Temperament: </b>${cat.breeds[0].temperament}.</p></div></div>`
      );
      info.innerHTML = array.join();
      hidenLoader();
      error.style.display = "none";
    })
    .catch((err) => {
      hidenLoader();
      error.style.cssText = `
      display: "";
      `;
      Notiflix.Report.failure("Error", error.textContent);
    })
    .finally(() => {
      console.log("fetchCatByBreed has ended");
    });
});
