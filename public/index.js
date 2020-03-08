"use strict";

const gothenburg = document.querySelector(".gothenburg");
const today = new Date();
const dd = today.getDate();
const mm = today.getMonth() + 1;
const yyyy = today.getFullYear();

const todayDate = `${dd}/${mm}/${yyyy}`;
const date = document.querySelector(".date");

let hours = today.getHours();
let minutes = today.getMinutes();

const timeNow = document.querySelector(".time-now");
const timeFour = document.querySelector(".time-four");
const timeEigth = document.querySelector(".time-eight");
const timeTwelve = document.querySelector(".time-twelve");

timeNow.textContent = hours + ":" + minutes;
timeFour.textContent = getHours(4) + ":" + minutes;
timeEigth.textContent = getHours(8) + ":" + minutes;
timeTwelve.textContent = getHours(12) + ":" + minutes;

date.textContent = todayDate;

const longitude = "11.98883";
const latitude = "57.701212";

const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;

const now = document.querySelector(".now");
const four = document.querySelector(".four");
const eight = document.querySelector(".eight");
const twelve = document.querySelector(".twelve");

displayWeather(0, now);
displayWeather(3, four);
displayWeather(7, eight);
displayWeather(11, twelve);
