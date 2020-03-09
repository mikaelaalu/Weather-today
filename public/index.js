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
const date = document.querySelector(".date");

const locationBtn = document.querySelector(".location-btn");

const today = new Date();
const dd = today.getDate();
const mm = today.getMonth() + 1;
const yyyy = today.getFullYear();

let hours = today.getHours();
let minutes = today.getMinutes();
const todayDate = `${dd}/${mm}/${yyyy}`;

date.textContent = todayDate;

let longitude = "11.98883";
let latitude = "57.701212";
let url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;

displayTime();
getForecast(url);

locationBtn.addEventListener("click", getLocation);
cities.addEventListener("change", chooseCity);
