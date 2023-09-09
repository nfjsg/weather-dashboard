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

// Make an API request using fetch() or other methods
function fetchWeatherData(cityName) {
    // Construct the API URL
    const apiUrl = `${API_BASE_URL}forecast?q=${cityName}&appid=${API_KEY}`;

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
function displayCurrentWeather(cityName, date, temperature, humidity, windSpeed, weatherIcon) {
    // Update the current weather section with data
    // Use the DOM elements like currentWeather to display the information
    // You can format and structure the data in the way you want it to be displayed
}

// Function to display 5-day forecast data
function displayForecast(forecastData) {
    // Update the forecast section with data
    // Use the DOM elements like forecast to display the 5-day forecast
    // Iterate through forecastData and format the data as needed
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


