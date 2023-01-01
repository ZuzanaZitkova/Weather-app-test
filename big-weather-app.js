function changeCityName(event) {
  event.preventDefault();
  let input = document.querySelector('#city-form');
  let city = document.querySelector('#city-name');
  if (input.value.length < 1) {
    city = 'Christchurch';
  } else {
    let value = input.value;
    city.innerHTML = value;
  }
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let daysHere = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  let monthsHere = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  let year = date.getFullYear();
  let month = monthsHere[date.getMonth()];
  let dateNow = date.getDate();
  let day = daysHere[date.getDay()];

  return `${day}, ${dateNow} ${month} ${year} `;
}
function getForecast(coordinates) {
  let apiKey = '8c78e9e7e9928cd1a2a6f923072c3dec';
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
//add function to change the temperature to temp. of the searched city
function getWeatherDetails(response) {
  let temperature = Math.round(response.data.main.temp);
  let change = document.querySelector('#number');
  change.innerHTML = `${temperature}`;

  celsius = Math.round(response.data.main.temp);

  let windNow = Math.round(response.data.wind.speed);
  let windChange = document.querySelector('#wind');
  windChange.innerHTML = `wind: ${windNow} km/h`;

  let humidityNow = Math.round(response.data.main.humidity);
  let humidityChange = document.querySelector('#humidity');
  humidityChange.innerHTML = `humidity: ${humidityNow} %`;

  let dateNow = document.querySelector('#date-today');
  dateNow.innerHTML = formatDate(response.data.dt * 1000);

  let iconChange = document.querySelector('#picture-of-weather');
  iconChange.setAttribute(
    'src',
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let describeNow = response.data.weather[0].description;
  let describeChange = document.querySelector('#describe-weather');
  describeChange.innerHTML = describeNow;

  getForecast(response.data.coord);
}

function formatDayWeek(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let day = date.getDay();

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector('#forecast');
  let forecast = response.data.daily;
  let forecastHtml = `<div class=row>`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHtml =
        forecastHtml +
        `<div class="col-2">
              <span class="day" id="forecast-day"> ${formatDayWeek(
                forecastDay.dt
              )}</span><br />
              <img
                src=" https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png "
                width="45"
                class="forecast-pic"
              /><br />
              <span class="max-temperature">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="min-temperature"> ${Math.round(
                forecastDay.temp.min
              )}°</span></div>  
             `;
      +`</div>`;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}

function changeTemp() {
  let theCity = document.querySelector('#city-form');
  if (theCity.value.length > 0) {
    let apiCity = theCity.value;
    let apiKey = '373700cc0c15cdf7aca8026071f4b33a';
    let units = 'metric';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(getWeatherDetails);
  } else {
    let apiCity = 'Christchurch';
    let apiKey = '373700cc0c15cdf7aca8026071f4b33a';
    let units = 'metric';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(getWeatherDetails);
  }
}

//add a fucntion to change the location to a current loccation

function showData(response) {
  let newDegrees = document.querySelector('#temp');
  newDegrees.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  let locName = document.querySelector('#city-name');
  locName.innerHTML = response.data.name;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = '373700cc0c15cdf7aca8026071f4b33a';
  let currentapiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(currentapiUrl).then(showData);
}
function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let submitCity = document.querySelector('form');
changeTemp();
submitCity.addEventListener('submit', changeTemp);

let newLocation = document.querySelector('#location-button');
newLocation.addEventListener('click', getPosition);

submitCity.addEventListener('submit', changeCityName);
