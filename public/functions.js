"use strict";

const citiesArray = {
  stockholm: {
    name: "Stockholm",
    longitude: "18.039464",
    latitude: "59.305729"
  },
  gothenburg: {
    name: "Gothenburg",
    longitude: "11.98883",
    latitude: "57.701212"
  },
  malmo: {
    name: "Malmö",
    longitude: "13.015505",
    latitude: "55.590908"
  }
};

function getHours(addHours) {
  const result = hours + addHours;

  if (result > 23) {
    const time = result - 24;
    return `0${time}`;
  } else {
    return result;
  }
}

function getMinutes(minutes) {
  if (minutes < 10) {
    return `0${minutes}`;
  } else {
    return minutes;
  }
}

function displayTime() {
  timeNow.textContent = getHours(0) + ":" + getMinutes(minutes);
  timeFour.textContent = getHours(4) + ":" + getMinutes(minutes);
  timeEigth.textContent = getHours(8) + ":" + getMinutes(minutes);
  timeTwelve.textContent = getHours(12) + ":" + getMinutes(minutes);
}

function getForecast(url) {
  displayWeather(0, now, url);
  displayWeather(3, four, url);
  displayWeather(7, eight, url);
  displayWeather(11, twelve, url);
}

function getWeather(time, url) {
  return fetch(url)
    .then(response => response.json())
    .then(json => {
      let currentTemp;
      let weatherSymbol;

      for (let i = 0; i < json.timeSeries[time].parameters.length; i++) {
        if (json.timeSeries[time].parameters[i].name == "t") {
          currentTemp = json.timeSeries[time].parameters[i].values[0];
        }

        if (json.timeSeries[time].parameters[i].name == "Wsymb2") {
          weatherSymbol = json.timeSeries[time].parameters[i].values[0];
        }
      }

      let weatherSituation;
      switch (weatherSymbol) {
        case 1:
        case 2:
          weatherSituation = "sun";
          break;
        case 3:
        case 4:
          weatherSituation = "some-clouds";
          break;
        case 5:
        case 6:
        case 7:
          weatherSituation = "cloudy";
          break;

        case 8:
        case 9:
        case 12:
        case 13:
        case 18:
        case 19:
          weatherSituation = "rain";
          break;
        case 10:
        case 14:
        case 19:
        case 20:
          weatherSituation = "rainy";
          break;
        case 21:
        case 11:
          weatherSituation = "thunder";
          break;

        case 15:
        case 16:
        case 22:
        case 23:
        case 25:
        case 26:
        case 17:
        case 24:
        case 27:
          weatherSituation = "snow";
          break;

        default:
          break;
      }
      const temaplate = `<p>Temprature: ${currentTemp}°C </p>
       <img class="weather-icon" src="images/${weatherSituation}.png" alt=""> `;
      return temaplate;
    });
}

function clean() {
  now.innerHTML = "";
  four.innerHTML = "";
  eight.innerHTML = "";
  twelve.innerHTML = "";
}

function displayWeather(clock, where, url) {
  const time = clock;
  const template = getWeather(time, url);

  template.then(function(result) {
    let div = document.createElement("div");

    div.innerHTML = result;

    where.appendChild(div);
  });
}

function chooseCity() {
  const city = cities.options[cities.selectedIndex].value;

  selectedCity.textContent = citiesArray[city].name;
  longitude = citiesArray[city].longitude;
  latitude = citiesArray[city].latitude;
  let url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;
  clean();
  getForecast(url);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Not working");
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  selectedCity.textContent = "Current position";
  clean();

  let url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;
  getForecast(url);
}
