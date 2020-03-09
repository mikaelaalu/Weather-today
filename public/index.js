"use strict";

const timeNow = document.querySelector(".time-now");
const timeFour = document.querySelector(".time-four");
const timeEigth = document.querySelector(".time-eight");
const timeTwelve = document.querySelector(".time-twelve");

const now = document.querySelector(".now");
const four = document.querySelector(".four");
const eight = document.querySelector(".eight");
const twelve = document.querySelector(".twelve");

const cities = document.querySelector(".cities");

const selectedCity = document.querySelector(".selected-city");

const today = new Date();
const dd = today.getDate();
const mm = today.getMonth() + 1;
const yyyy = today.getFullYear();

const date = document.querySelector(".date");

let hours = today.getHours();
let minutes = today.getMinutes();

const todayDate = `${dd}/${mm}/${yyyy}`;
timeNow.textContent = hours + ":" + minutes;
timeFour.textContent = getHours(4) + ":" + minutes;
timeEigth.textContent = getHours(8) + ":" + minutes;
timeTwelve.textContent = getHours(12) + ":" + minutes;

date.textContent = todayDate;

let longitude;
let latitude;
longitude = "11.98883";
latitude = "57.701212";
const proxy = "https://cors-anywhere.herokuapp.com/";
let url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;

getForecast(url);

cities.addEventListener("change", e => {
  const city = cities.options[cities.selectedIndex].value;
  e.preventDefault();
  if (city == "stockholm") {
    selectedCity.textContent = "Stockholm";
    longitude = "18.039464";
    latitude = "59.305729";
    let url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;
    clean();
    getForecast(url);
    console.log("sthlm" + latitude + longitude);
  }
  if (city == "gothenburg") {
    selectedCity.textContent = "Gothenburg";
    longitude = "11.98883";
    latitude = "57.701212";
    let url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;
    clean();
    getForecast(url);
    console.log("gbg" + longitude + latitude);
  }
  if (city == "malmo") {
    selectedCity.textContent = "Malmö";
    longitude = "13.015505";
    latitude = "55.590908";
    let url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;
    clean();
    getForecast(url);
    console.log("malmo" + longitude + latitude);
  }
});
