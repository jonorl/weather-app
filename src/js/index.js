// Module import

import "../css/style.css";

// Global variables

const api_key = "Z5ESM8BZKP44Y6TQXX3ZX5VS4";
let location;
let unit;
let URL;
let temperature;
const searchBtn = document.querySelector("#search");
const loader = document.querySelector('.loader');

// Event Listeners

searchBtn.addEventListener("click", () => {
  location = document.querySelector("#city").value;
  unit = document.querySelector("#metric").checked ? "metric" : "us";
  URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${api_key}&unitGroup=${unit}`;
  weather();
});

function weather() {
  getWeather();
  async function getWeather() {
    try {
      loader.style.display = 'block';
      const response = await fetch(URL, { mode: "cors" });
      const weatherData = await response.json();
      loader.style.display = 'none';
      temperature = weatherData.days[0].temp
      console.log(weatherData.days[0].temp);
      renderTemp();
    } catch (error) {
      err();
    }
  }
}

function err() {
  alert("Error");
}

function renderTemp() {
  const resultsContainer = document.querySelector('.results')

  // Remove children if any

  while (resultsContainer.firstChild) {
    resultsContainer.removeChild(resultsContainer.lastChild);
  }

  const cityNameDisplay = document.createElement("div");
  cityNameDisplay.classList.add("cityNameDisplay");
  cityNameDisplay.textContent = location;

  const temperatureDisplay = document.createElement("div");
  temperatureDisplay.classList.add('temperatureDisplay');
  temperatureDisplay.textContent = temperature

  resultsContainer.append(cityNameDisplay, temperatureDisplay);
}