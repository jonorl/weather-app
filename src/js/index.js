function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

// Module import

import "../css/style.css";

// Global variables

const api_key = "Z5ESM8BZKP44Y6TQXX3ZX5VS4";
let location;
let unit;
let URL;
let temperature;
let conditions;
let weatherIcon;
const date = new Date();
const images = importAll(
  require.context("../images", false, /\.(png|jpe?g|gif|svg)$/)
);
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = weekday[date.getDay()];
const searchBtn = document.querySelector("#search");
const loader = document.querySelector(".loader");

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
      loader.style.display = "block";
      const response = await fetch(URL, { mode: "cors" });
      const weatherData = await response.json();
      temperature = weatherData.days[0].temp;
      conditions = weatherData.days[0].conditions;
      weatherIcon = weatherData.days[0].icon;
      console.log(weatherData.days[0].conditions);
      console.log(weatherData);
      renderTemp();
      loader.style.display = "none";
    } catch (error) {
      alert(error);
    }
  }
}

function renderTemp() {
  const resultsContainer = document.querySelector(".results");

  // Remove children if any

  while (resultsContainer.firstChild) {
    resultsContainer.removeChild(resultsContainer.lastChild);
  }

  const todayDate = document.createElement("div");
  todayDate.classList.add("today");
  todayDate.textContent = day;

  const cityNameDisplay = document.createElement("div");
  cityNameDisplay.classList.add("cityNameDisplay");
  cityNameDisplay.textContent = location;

  const temperatureDisplay = document.createElement("div");
  temperatureDisplay.classList.add("temperatureDisplay");
  temperatureDisplay.textContent = temperature;

  const conditionDisplay = document.createElement("div");
  conditionDisplay.classList.add("conditionDisplay");
  conditionDisplay.textContent = conditions;

  const icon = document.createElement("img");
  icon.classList.add("icon");
  icon.src = images[`${weatherIcon}.svg`];
  console.log(icon.src);

  resultsContainer.append(
    todayDate,
    cityNameDisplay,
    temperatureDisplay,
    conditionDisplay,
    icon
  );
}
