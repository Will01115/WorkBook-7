const citiesArray = document.querySelector("#city-ddl");
 

function loadCitiesArray() {
    let defualtOption = document.createElement("option")
    defualtOption.value = "",
    defualtOption.innerText = "Select City...";
   
    for (const city of citiesArray) {
      let option = document.createElement("option");
      option.value = city.name;
      option.innerText = city.name;
      citiesArray.appendChild(option);
    }
  }
  loadCitiesArray();

  fetch(`https://api.weather.gov/points/${city.latitude} ${city.longitude}`)
        .then((response) => response.json())
        .then((point) =>  {
            
           console.log(properites.forecast);
        });

// Test API using REST Client 
// Call the Points API with Lat, Long
// Then log out the response data: office grid x,y
// Then call the forecast API with grid x,y + gridID
// Then log out the forecast data 
// Then add to table 