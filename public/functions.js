"use strict";

function getHours(addHours) {
  const result = hours + addHours;

  if (result > 23) {
    return result - 24;
  } else {
    return result;
  }
}

function getWeather(time) {
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
          weatherSituation = "Sun";
          break;
        case 3:
        case 4:
          weatherSituation = "Some clouds";
          break;
        case 5:
        case 6:
          weatherSituation = "Cloudy";
          break;

        case 7:
          weatherSituation = "Fog";
          break;
        case 8:
        case 9:
        case 12:
        case 13:
        case 18:
        case 19:
          weatherSituation = "Moderate rain";
          break;
        case 10:
        case 14:
        case 19:
        case 20:
          weatherSituation = "Heavy rain";
          break;
        case 21:
        case 11:
          weatherSituation = "Thunderstorm";
          break;

        case 15:
        case 16:
        case 22:
        case 23:
        case 25:
        case 26:
          weatherSituation = "Moderate snow";
          break;
        case 17:
        case 24:
        case 27:
          weatherSituation = "Heavy snow";
          break;

        default:
          break;
      }
      const temaplate = `<p>Temprature: ${currentTemp} </p>
        <p> Weather: ${weatherSituation} </p>`;
      return temaplate;
    });
}

function displayWeather(clock, where) {
  const time = clock;
  const template = getWeather(time);

  template.then(function(result) {
    let div = document.createElement("div");
    div.innerHTML = result;

    where.appendChild(div);
  });
}
