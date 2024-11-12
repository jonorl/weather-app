// Module import

import "../css/style.css";

// Global variables

const api_key = 'Z5ESM8BZKP44Y6TQXX3ZX5VS4';
const location = 'Kampala';
const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${api_key}&unitGroup=metric`;

// Event Listeners

// searchBtn.addEventListener("click", () => {

function weather() {
  getWeather();
  async function getWeather() {
    try {
        const response = await fetch(
            URL,
            { mode: "cors" }
          );
      const weatherData = await response.json();
      console.log(weatherData.days[0].temp);
    } catch (err) {
      err();
    }
  }
}

function err() {
  console.log("Error");
}

weather();
