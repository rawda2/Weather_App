// DOM Elements
var SearchBtn = document.getElementById("searchBtn");
var SearchInput = document.getElementById("search");
var Cname = document.getElementById("cityName");
var temp = document.getElementById("degree");
var percentage = document.getElementById("percentage");
var air = document.getElementById("air");
var image = document.getElementById("img");
var tempCBtn = document.getElementById("cel");
var tempFBtn = document.getElementById("feh");
var date = document.getElementById("date");
var windS = document.getElementById("wind");
var valid = document.getElementById("valid");
var invalid = document.getElementById("invalid");
var main = document.getElementById("main");

//Dark And light MOOD
var modeD = document.getElementById("modeD");
var modeL = document.getElementById("modeL");
modeD.addEventListener("click", () => {
  main.classList.add("dark");
  modeD.style.display = "none";
  modeL.style.display = "block";
});
modeL.addEventListener("click", () => {
  main.classList.remove("dark");
  modeL.style.display = "none";
  modeD.style.display = "block";
});

// API Key
var APIKey = "18bd7d78212c339733d99b7021182646";
var cityName = "";

// Event listener for search button
SearchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  cityName = SearchInput.value;

  if (cityName) {
    const Url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;

    fetchWeatherData(Url);
  } else {
    displayErrorMessage();
  }
});

// Fetch weather data
function fetchWeatherData(Url) {
  fetch(Url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      displayWeather(data);
      displayValidMessage();
    })
    .catch((error) => {
      console.log("Error:", error);
      displayErrorMessage();
    });
}

// Display weather data
function displayWeather(data) {
  var nameC = data.name;
  var country = data.sys.country;
  var temperature = (data.main.temp - 273.15).toFixed(2); // Celsius
  var tempF = ((data.main.temp - 273.15) * 1.8 + 32).toFixed(2); // Fahrenheit
  var pressure = data.main.pressure;
  var humidity = data.main.humidity;
  var windSpeed = data.wind.speed;
  var weatherStatus = data.weather[0];

  // Update DOM elements with data
  Cname.innerHTML = `${nameC}, ${country}`;
  temp.innerHTML = `${temperature} °C`;
  percentage.innerHTML = `${humidity}%`;
  air.innerHTML = `${pressure} hPa`;
  windS.innerHTML = `${windSpeed} m/s`;

  // Display current date
  date.innerHTML = getCurrentDate();

  // Update weather icon
  var imageUrl = `https://openweathermap.org/img/wn/${weatherStatus.icon}@2x.png`;
  image.src = imageUrl;

  // Temperature unit switcher
  tempCBtn.addEventListener("click", () => {
    temp.innerHTML = `${temperature} °C`;
  });

  tempFBtn.addEventListener("click", () => {
    temp.innerHTML = `${tempF} °F`;
  });
}

// Display valid message
function displayValidMessage() {
  invalid.style.display = "none";
  valid.style.display = "block";
}

// Display error message
function displayErrorMessage() {
  invalid.style.display = "block";
  valid.style.display = "none";
}

// Get current date formatted as DD/MM/YYYY
function getCurrentDate() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = currentDate.getFullYear();
  return `${day}/${month}/${year}`;
}
