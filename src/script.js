function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

function formatDay (timestamp) {
  let date = new Date (timestamp * 1000);
  let day = date.getDay ();
  let days = ["Sun", "Mon", "Tues","Wed","Thurs","Fri","Sat"];

  return days [day];
  
}

function displayForecast (response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  
  let forecastHTML= `<div class ="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index < 6) {
  forecastHTML  = forecastHTML + `
            <div class="col-2">
                <div class="weather-forecast-date">${formatDay (forecastDay.dt)}</div>
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="45" />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
                  <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
                </div>
            </div>`;
            }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML= forecastHTML;
}

function getForecast (coordinates) {
  console.log(coordinates);
  let apiKey = "32560c27e8e23a3db17cfaff2b468cd2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
 ;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let searchCity = "Germantown";
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;

  iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute (
    "alt", response.data.weather[0].description
  );

  getForecast (response.data.coord);


}

function searchCity(city) {
  let apiKey = "32560c27e8e23a3db17cfaff2b468cd2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);

}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
  
}

function searchLocation(position) {
  let apiKey = "32560c27e8e23a3db17cfaff2b468cd2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
  
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);

} 
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}


let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function displayfahrenheitTemperature (event){
  event.preventDefault();
  let temperatureElement = document.querySelector ("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
searchCity("Germantown");

