// script.js

// Constants for API base URL and API key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '012dd1c1242aa6f2cfa07a3218ba67ff';
const forecastDays = 20;

// DOM elements
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');
const searchHistory = document.getElementById('search-history');

// Event listener for form submission
cityForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const cityName = cityInput.value.trim();
    if (cityName !== '') {
        // Call a function to fetch weather data for the entered city
        fetchWeatherData(cityName);
    }
    cityInput.value = '';
});

// Make an API request using fetch() or other methods
function fetchWeatherData(cityName) {
    // Construct the API URL
   const apiUrl = `${API_BASE_URL}forecast?q=${cityName}&appid=${API_KEY}&cnt=${forecastDays}`;
    //const apiUrl = `${API_BASE_URL}weather?q=${cityName}&appid=${API_KEY}`;
    // Make the API request using fetch()
    fetch(apiUrl)
        .then((response) => {
            // Check if the response status is OK (200)
            if (response.ok) {
                // Parse the JSON response
                return response.json();
            } else {
                // Handle the case where the response is not OK (e.g., city not found)
                throw new Error('City not found');
            }
        })
        .then((data) => {
            // Handle the JSON data and update the DOM with weather data
            handleWeatherData(data);
        })
        .catch((error) => {
            // Handle errors (e.g., network error, city not found)
            console.error(error);
            // Display an error message to the user, e.g., in the current weather section
            currentWeather.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Function to handle weather data after a successful API request
function handleWeatherData(data) {
    // Extract the relevant information from the API response data
    const cityName = data.city.name;
    const date = data.list[0].dt_txt; // You may need to format this date
    const temperature = data.list[0].main.temp; // Temperature in Kelvin, you may need to convert it
    const humidity = data.list[0].main.humidity;
    const windSpeed = data.list[0].wind.speed;
    const weatherIcon = data.list[0].weather[0].icon;

    // Update the DOM with the weather data
    displayCurrentWeather(cityName, date, temperature, humidity, windSpeed, weatherIcon);

    // Extract and display the 5-day forecast data if needed
    const forecastData = data.list.slice(1, 6); // Get the next 5 days of data
    displayForecast(forecastData);
}

// Function to display current weather data
// Function to display current weather data
function displayCurrentWeather(cityName, date, temperature, humidity, windSpeed, weatherIcon) {
    // Create HTML elements to display the current weather data
    const weatherInfo = document.createElement('div');
    weatherInfo.classList.add('weather-info'); // You can define a CSS class for styling

    // City name and date
    const cityDate = document.createElement('h2');
    cityDate.textContent = `${cityName} - ${formatDate(date)}`; // You can define a formatDate function
    weatherInfo.appendChild(cityDate);

    // Weather icon
    const iconImage = document.createElement('img');
    iconImage.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`; // Replace with your weather icon URL
    iconImage.alt = 'Weather Icon';
    weatherInfo.appendChild(iconImage);

    // Temperature
    const tempElement = document.createElement('p');
    tempElement.textContent = `Temperature: ${convertKelvinToCelsius(temperature)}°C`; // You can define a conversion function
    weatherInfo.appendChild(tempElement);

    // Humidity
    const humidityElement = document.createElement('p');
    humidityElement.textContent = `Humidity: ${humidity}%`;
    weatherInfo.appendChild(humidityElement);

    // Wind speed
    const windElement = document.createElement('p');
    windElement.textContent = `Wind Speed: ${windSpeed} m/s`;
    weatherInfo.appendChild(windElement);

    // Update the current weather section with the weatherInfo div
    currentWeather.innerHTML = ''; // Clear previous data
    currentWeather.appendChild(weatherInfo);
}




// Function to convert temperature from Kelvin to Celsius (you can customize this)
function convertKelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(1);
}


// Function to display 5-day forecast data
// Function to display 5-day forecast data
function displayForecast(forecastData) {
    // Clear previous forecast data
    forecast.innerHTML = '';
    forecast.style.paddingBottom="100px";

    // Iterate through forecastData (an array of forecast items)
    forecastData.forEach((item) => {
        // Create a container for each forecast item
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item'); // You can define a CSS class for styling

        // Date
        const dateElement = document.createElement('p');
        dateElement.style.marginTop="50px";
        dateElement.textContent = formatDate(item.dt_txt); // You can define a formatDate function
        forecastItem.appendChild(dateElement);

        // Weather icon
        const iconImage = document.createElement('img');
        iconImage.src = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`; // Replace with your weather icon URL
        iconImage.alt = 'Weather Icon';
        forecastItem.appendChild(iconImage);

        // Temperature
        const tempElement = document.createElement('p');
        tempElement.textContent = `Temperature: ${convertKelvinToCelsius(item.main.temp)}°C`; // You can define a conversion function
        forecastItem.appendChild(tempElement);

        // Humidity
        const humidityElement = document.createElement('p');
        humidityElement.textContent = `Humidity: ${item.main.humidity}%`;
        forecastItem.appendChild(humidityElement);

        // Wind speed
        const windElement = document.createElement('p');
        windElement.textContent = `Wind Speed: ${item.wind.speed} m/s`;
        forecastItem.appendChild(windElement);

        // Append the forecastItem to the forecast section
        forecast.appendChild(forecastItem);
    });
}


// Function to format a date (you can customize this)
function formatDate(dateString) {
    console.log(dateString); // Log the input date string
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}


// Function to add a city to the search history
function addToSearchHistory(cityName) {
    // Create an <li> element and append it to the search history list
    const listItem = document.createElement('li');
    listItem.textContent = cityName;
    searchHistory.appendChild(listItem);

    // Add a click event listener to the list item to fetch weather data for that city again
    listItem.addEventListener('click', function () {
        fetchWeatherData(cityName);
    });
}

// Initialization code
// Load search history from localStorage, if available
const searchHistoryItems = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Populate the search history list with items from localStorage
searchHistoryItems.forEach((cityName) => {
    addToSearchHistory(cityName);
});



