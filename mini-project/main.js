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
  fetch(`https://api.weather.gov/points/${city.latitude},${city.longitude}`)
    .then((response) => response.json())
    .then(function (point) {
      let forecastUrl = point.properties.forecast;

      fetch(forecastUrl)
        .then((response) => response.json())
        .then(function (forecast) {
          forecastTableBody.innerHTML = "";
          for (const period of forecast.properties.periods) {
            buildTableRow(period);
          }
        });
    });
}

function buildTableRow(period) {
  let row = forecastTableBody.insertRow();

  let td1 = row.insertCell();
  td1.innerText = period.name;

  let td2 = row.insertCell();
  td2.innerText = `Temperature: ${period.temperature} F`;

  let td3 = row.insertCell();
  td3.innerText = period.detailedForecast;
}

function handleCityChanged() {
  const cityName = cityDDL.value;

  const selectedCity = cities.find(function (city) {
    return city.name == cityName;
  });

  getPoint(selectedCity);
}
