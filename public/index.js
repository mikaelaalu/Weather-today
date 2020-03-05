"use strict";

const gothenburg = document.querySelector(".gothenburg");
const now = document.querySelector(".now");
const four = document.querySelector(".four");

const today = new Date();
const dd = today.getDate();

const mm = today.getMonth() + 1;
const yyyy = today.getFullYear();

const todayDate = mm + "/" + dd + "/" + yyyy;
const date = document.querySelector(".date");

date.textContent = todayDate;

let time = 0;
let when;

now.addEventListener("click", function() {
  time = 0;
  when = "Now";
  test(when);
});

four.addEventListener("click", function() {
  time = 4;
  when = "In four hours";
  test(when);
});

const longitude = "11.98883";
const latitude = "57.701212";

const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;

function test(when) {
  fetch(url)
    .then(response => response.json())
    .then(json => {
      const currentTemp = Math.floor(
        json.timeSeries[time].parameters[1].values[0]
      );

      //Value between 8 and 0, 8 is very cloudy
      const clouds = json.timeSeries[time].parameters[7].values[0];

      let cloudy;
      switch (clouds) {
        case 0:
        case 1:
        case 2:
          cloudy = "No clouds";

          break;

        case 3:
        case 4:
        case 5:
          cloudy = "Some clouds";

          break;

        case 6:
        case 7:
        case 8:
          cloudy = "Very cloudy";

          break;

        default:
          break;
      }

      //check for precipitation only
      const now = json.timeSeries[time].parameters[15].level;
      const fourHoursAhead = json.timeSeries[4].parameters[15].level;
      const eightHoursAhead = json.timeSeries[8].parameters[15].level;

      let precipitation;

      switch (now) {
        case 0:
          precipitation = "No precipitation";
          break;
        case 1:
          precipitation = "Snow";
          break;
        case 2:
          precipitation = "Snow and rain";
          break;
        case 3:
          precipitation = "Rain";
          break;
        case 4:
          precipitation = "Drizzle";
          break;
        case 5:
          precipitation = "Freezing rain";
          break;
        case 6:
          precipitation = "Freezing drizzle";
          break;

        default:
          break;
      }

      const div = document.createElement("div");
      const temaplate = ` <h2> ${when} </h2>
    <p>Temprature: ${currentTemp} </p>
    <p>Clouds: ${cloudy}</p>
    <p>Precipitation: ${precipitation} </p> `;

      div.innerHTML = temaplate;

      gothenburg.appendChild(div);
    });
}
