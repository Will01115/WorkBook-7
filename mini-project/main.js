const cityDDL = document.querySelector("#city-ddl");
const forecastTableBody = document.querySelector("#forecast-table-body");

function loadCitiesArray() {
  let defualtOption = document.createElement("option");
  (defualtOption.value = ""), (defualtOption.innerText = "Select City...");
  cityDDL.appendChild(defualtOption);

  for (const city of cities) {
    let option = document.createElement("option");
    option.value = city.name;
    option.innerText = city.name;
    cityDDL.appendChild(option);
  }
}
loadCitiesArray();

function getPoint(city) {
  fetch("https://api.weather.gov/points/32.6791,-97.4641")
    .then((response) => response.json())
    .then(function (point) {
      let forecastUrl = point.properties.forecast;
      console.log(forecastUrl);

      fetch(forecastUrl)
        .then((response) => response.json())
        .then(function (forecast) {
          console.log(forecast.properties.periods);
          for (const period of forecast.properties.periods) {
            buildTableRow(period);
          }
        });
    });
}

function buildTableRow(period) {
  console.log(period.name, period.temperature, period.detailedForecast);
  let row = forecastTableBody.insertRow();

  let td1 = row.insertCell();
  td1.innerText = period.name;

  let td2 = row.insertCell();
  td2.innerText = `Temperature: ${period.temperature} F`;

  let td3 = row.insertCell();
  td3.innerText = period.detailedForecast;
}

function handleCityChanged() {
  console.log(cityDDL.value);
  getPoint();
}
// Test API using REST Client
// Call the Points API with Lat, Long
// Then log out the response data: office grid x,y
// Then call the forecast API with grid x,y + gridID
// Then log out the forecast data
// Then add to table
