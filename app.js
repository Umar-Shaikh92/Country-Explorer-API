const flagImg = document.querySelector(".flagImg");
const cardTitle = document.querySelector(".card-title");
const submitBtn = document.querySelector("#submitBtn");
const countryInput = document.querySelector("#countryInput");
const description = document.querySelector("#description");
const borderList = document.querySelector("#borderList");
const toastContainer = document.querySelector(".toast");

const region = document.querySelector(".region");

function getCountryData() {
  fetch(`https://restcountries.com/v3.1/name/${countryInput.value}`)
    .then((response) => {
      return response.json(); //promise
    })
    .then((response) => {
      const [country] = response;
      console.log(country, "==>> country");
      const { name, flags, borders, population, capital, continents } = country;
      flagImg.src = flags.png;
      cardTitle.innerHTML = name.common;
      description.innerHTML = `This is the country with the population of ${population} and the capital is ${capital[0]}`;
      region.innerHTML = `Region: ${continents[0]}`;
      if (borders) {
        const bordersHtml = borders.map((border) => {
          return `<li class="list-group-item">${border}</li>`;
        });
        console.log(bordersHtml.join(""), "==>> bordersHtml");
        borderList.innerHTML = bordersHtml.join("");
      } else {
        borderList.innerHTML = ``;
      }
    })
    .catch((err) => {
      console.log(err, "==>> err");

      if (toastContainer) {
        const toastBody = toastContainer.querySelector(".toast-body");
        toastBody.textContent = "Your input is incorrect";
        const toast = new bootstrap.Toast(toastContainer, {
          animation: true,
          autohide: true,
          delay: 5000,
        });
        toast.show();
      }
    });
}

submitBtn.addEventListener("click", getCountryData);
