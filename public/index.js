"use strict";

fetch(
  "https://community-open-weather-map.p.rapidapi.com/weather?callback=test&id=2172797&units=%2522metric%2522%20or%20%2522imperial%2522&mode=xml%252C%20html&q=Gothenburg",
  {
    method: "GET",
    headers: {
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "x-rapidapi-key": "SIGN-UP-FOR-KEY"
    }
  }
)
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });
