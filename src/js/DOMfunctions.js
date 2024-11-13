// Module import

import { location, unit, URLAddress } from "./index";

// Global variables

let temperature;

let conditions;
let weatherIcon;
const date = new Date();
const images = importAll(
  // import all images from images directory with help of the function below
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

const loader = document.querySelector(".loader");

// DOM functions

export async function renderTemp() {
  const resultsContainer = document.querySelector(".results");

  // Remove children if any

  while (resultsContainer.firstChild) {
    resultsContainer.removeChild(resultsContainer.lastChild);
  }

  try {
    loader.style.display = "block";

    for (let i = 0; i < 5; i++) {
      const response = await fetch(URLAddress, { mode: "cors" });
      const weatherData = await response.json();

      temperature = weatherData.days[i].temp;
      conditions = weatherData.days[i].conditions;
      weatherIcon = weatherData.days[i].icon;

      const dayOfWeek = document.createElement("div");
      dayOfWeek.classList.add("date" + i);
      dayOfWeek.textContent = weekday[(date.getDay() + i) % weekday.length]; // Using modulo to avoid going over 7 days array

      const cityNameDisplay = document.createElement("div");
      cityNameDisplay.classList.add("cityNameDisplay");
      cityNameDisplay.textContent = location;

      const temperatureDisplay = document.createElement("div");
      temperatureDisplay.classList.add("temperatureDisplay");
      temperatureDisplay.textContent =
        temperature + (unit === "metric" ? "C" : "F");

      const conditionDisplay = document.createElement("div");
      conditionDisplay.classList.add("conditionDisplay");
      conditionDisplay.textContent = conditions;

      const icon = document.createElement("img");
      icon.classList.add("icon");
      icon.src = images[`${weatherIcon}.svg`];

      resultsContainer.append(
        dayOfWeek,
        cityNameDisplay,
        temperatureDisplay,
        conditionDisplay,
        icon
      );
    }
    loader.style.display = "none";
  } catch (error) {
    alert(error);
  }
}

// Function to import all images from images directory

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
