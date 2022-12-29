//add a flexible date, keep it updated
let currentDate = new Date();
let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'November',
  'December'
];

let date = currentDate.getDate();
let month = months[currentDate.getMonth() - 1];
let day = days[currentDate.getDay()];
let year = currentDate.getFullYear();

function currentTime() {
  let today = document.querySelector('#date-today');
  return (today.innerHTML = ` ${day}, ${date} ${month} ${year}`);
}
currentTime();

//add function to change the main highlight to the searched city

function changeCityName(event) {
  event.preventDefault();
  let city = document.querySelector('#city-name');
  let input = document.querySelector('#city-form');
  city.innerHTML = input.value;
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
    'November',
    'December'
  ];
  let year = date.getFullYear();
  let month = monthsHere[date.getMonth() - 1];
  let dateNow = date.getDate();
  let day = daysHere[date.getDay()];

  return `${day}, ${dateNow} ${month} ${year} `;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = '373700cc0c15cdf7aca8026071f4b33a';
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
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

function displayForecast() {
  let forecastElement = document.querySelector('#forecast');
  let forecastHtml = `<div class=row>`;
  let days = ['Thu', 'Fri', 'Sat', 'Sun'];
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="col-2">
              <span class="day" id="forecast-day"> ${day}</span><br />
              <img
                src=" https://openweathermap.org/img/wn/10d@2x.png "
                width="45"
                class="forecast-pic"
              /><br />
              <span class="max-temperature">17°</span>
              <span class="min-temperature"> 12°</span></div>
             `;
    +`</div>`;
  });
  forecastElement.innerHTML = forecastHtml;
}

function changeTemp() {
  let theCity = document.querySelector('#city-form');
  let apiCity = theCity.value;
  console.log(apiCity);
  let apiKey = '373700cc0c15cdf7aca8026071f4b33a';
  let units = 'metric';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(getWeatherDetails);
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

function showCelsius(event) {
  event.preventDefault();
  celsiusChange.classList.add('units-celsius');
  farenheitChange.classList.remove('units-celsius');
  let celsiustemp = document.querySelector('#number');
  celsiustemp.innerHTML = celsius;
}

function showFarenheit(change) {
  change.preventDefault();
  celsiusChange.classList.remove('units-celsius');
  farenheitChange.classList.add('units-celsius');
  let temperature = document.querySelector('#number');
  let farenheitHere = (temperature.innerHTML * 9) / 5 + 32;
  temperature.innerHTML = Math.round(farenheitHere);
}
let celsius = 0;

let submitCity = document.querySelector('form');

submitCity.addEventListener('submit', changeTemp);

let newLocation = document.querySelector('#location-button');
newLocation.addEventListener('click', getPosition);

submitCity.addEventListener('submit', changeCityName);

let celsiusChange = document.querySelector('#celsius');
celsiusChange.addEventListener('click', showCelsius);

submitCity.addEventListener('submit', showCelsius);

let farenheitChange = document.querySelector('#farenheit');
farenheitChange.addEventListener('click', showFarenheit);
