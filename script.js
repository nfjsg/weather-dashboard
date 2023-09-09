// script.js

// Constants for API base URL and API key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = 'your_api_key_here';

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

// Function to fetch weather data from the API
function fetchWeatherData(cityName) {
    // Construct the API URL
    const apiUrl = `${API_BASE_URL}forecast?q=${cityName}&appid=${API_KEY}`;
    
    // Make an API request using fetch() or other methods
    // Handle the response and update the DOM with weather data
}

// Functions to display current weather and 5-day forecast
function displayCurrentWeather(weatherData) {
    // Update the current weather section with data
}

function displayForecast(forecastData) {
    // Update the forecast section with data
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

