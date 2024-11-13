// Module import

import "../css/style.css";
import { renderTemp } from "./DOMfunctions";

// Global variables

const api_key = "Z5ESM8BZKP44Y6TQXX3ZX5VS4";
export let location;
const searchBtn = document.querySelector("#search");
export let unit;
export let URLAddress;

// Event Listeners

searchBtn.addEventListener("click", () => {
  location = document.querySelector("#city").value;
  unit = document.querySelector("#metric").checked ? "metric" : "us";
  URLAddress = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${api_key}&unitGroup=${unit}`;
  renderTemp();
});
