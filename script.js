// Define variables to store DOM elements
const form = document.querySelector('form');
const input = document.querySelector('input');
const currentWeatherSection = document.getElementById('current-weather');
const forecastSection = document.getElementById('forecast');
const searchHistory = document.getElementById('search-history');
const apiKey = '012dd1c1242aa6f2cfa07a3218ba67ff';
const searchHistoryArray = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Function to fetch weather data for a city
function fetchWeatherData(city) {
  // Clear previous weather data
  currentWeatherSection.innerHTML = '';
  forecastSection.innerHTML = '';

  // Construct the API URL
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  // Make the API request
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Check if the data contains weather information
      if (data.list && data.list.length > 0) {
        // Display the current weather
        console.log(data);
        displayCurrentWeather(data);
        
        // Display the 5-day forecast
        console.log(data.list[0]);
        displayForecast(data.list);
        
        // Update the search history
        updateSearchHistory(city);
      } else {
        throw new Error('Weather data not found for the city');
      }
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

function getCoordinatesForCity(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (data.coord) {
        const { lat, lon } = data.coord;
        console.log(`Coordinates for ${city}: Latitude ${lat}, Longitude ${lon}`);
      } else {
        throw new Error('Coordinates not found for the city');
      }
    })
    .catch((error) => {
      console.error('Error fetching coordinates:', error);
    });
}

//let ass=document.querySelector(#city-input);


// Function to display current weather data
function displayCurrentWeather(data) {
  // Extract relevant data from the API response
  const cityName = data.city.name;
  const date = new Date(data.list[0].dt * 1000); // Convert UNIX timestamp to a JavaScript Date object
   // Temperature in Kelvin
   const temperatureKelvin = data.list[0].main.temp; // Temperature in Kelvin
const temperature = ((temperatureKelvin - 273.15) * 9/5 + 32).toFixed(2); // Convert Kelvin to Fahrenheit

 // const temperature = data.list[0].main.temp; // Convert Kelvin to Fahrenheit
  const humidity = data.list[0].main.humidity;
  const windSpeed = data.list[0].wind.speed;
  const weatherIcon = data.list[0].weather[0].icon;

  // Create HTML elements to display the data
  const currentWeatherDiv = document.createElement('div');
  currentWeatherDiv.classList.add('current-weather');

  const cityNameElement = document.createElement('h2');
  cityNameElement.textContent = cityName;

  const dateElement = document.createElement('p');
  dateElement.textContent = `Date: ${date.toLocaleDateString()}`;

  const temperatureElement = document.createElement('p');
  temperatureElement.textContent = `Temperature: ${temperature} °F`; // You can convert to Fahrenheit if needed

  const humidityElement = document.createElement('p');
  humidityElement.textContent = `Humidity: ${humidity}%`;

  const windSpeedElement = document.createElement('p');
  windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`; // You can convert to other units if needed

  const weatherIconElement = document.createElement('img');
  weatherIconElement.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
  weatherIconElement.alt = 'Weather Icon';

  // Append elements to the current weather section
  currentWeatherDiv.appendChild(cityNameElement);
  currentWeatherDiv.appendChild(dateElement);
  currentWeatherDiv.appendChild(weatherIconElement);
  currentWeatherDiv.appendChild(temperatureElement);
  currentWeatherDiv.appendChild(humidityElement);
  currentWeatherDiv.appendChild(windSpeedElement);

  // Replace the existing content in the current weather section
  currentWeatherSection.innerHTML = '';
  currentWeatherSection.appendChild(currentWeatherDiv);
}


// Function to display 5-day forecast data
function displayForecast(data) {

    const forecastTitle = document.createElement('h2');
  forecastTitle.textContent = '5-Day Forecast:';
  forecastTitle.id = 'forecast-heading'; // Set the id attribute

  // Clear previous forecast data
  forecastSection.innerHTML = '';
  forecastSection.appendChild(forecastTitle);


  // Create a container for the forecast
  const forecastContainer = document.createElement('div');
  forecastContainer.classList.add('forecast-container');

  // Loop through the forecast data
  for (let i = 1; i < data.length; i++) {
    if (i % 8 === 0 || i/8===4.875) {
      // Extract relevant data for a single forecast item
      const forecastItem = data[i];
      const date = new Date(forecastItem.dt * 1000); // Convert UNIX timestamp to a JavaScript Date object

      const temperatureKelvin =forecastItem.main.temp; // Temperature in Kelvin
      const temperature = ((temperatureKelvin - 273.15) * 9/5 + 32).toFixed(2); // Convert Kelvin to Fahrenheit
      //const temperature = forecastItem.main.temp;
      const humidity = forecastItem.main.humidity;
      const windSpeed = forecastItem.wind.speed;
      const weatherIcon = forecastItem.weather[0].icon;

      // Create an element for each forecast item
      const forecastItemDiv = document.createElement('div');
      forecastItemDiv.classList.add('forecast-item');

      const dateElement = document.createElement('p');
      dateElement.textContent = date.toLocaleDateString();

      const weatherIconElement = document.createElement('img');
      weatherIconElement.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
      weatherIconElement.alt = 'Weather Icon';

      const temperatureElement = document.createElement('p');
      temperatureElement.textContent = `Temperature: ${temperature} °F`; // You can convert to Fahrenheit if needed

      const humidityElement = document.createElement('p');
      humidityElement.textContent = `Humidity: ${humidity}%`;

      const windSpeedElement = document.createElement('p');
      windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`; // You can convert to other units if needed

      // Append elements to the forecast item
      forecastItemDiv.appendChild(dateElement);
      forecastItemDiv.appendChild(weatherIconElement);
      forecastItemDiv.appendChild(temperatureElement);
      forecastItemDiv.appendChild(humidityElement);
      forecastItemDiv.appendChild(windSpeedElement);

      // Append the forecast item to the forecast container
      forecastContainer.appendChild(forecastItemDiv);
    }
  }

  // Append the forecast container to the forecast section
  forecastSection.appendChild(forecastContainer);
}


// Function to update the search history
function updateSearchHistory(city) {
  // Add the city to the search history array
  searchHistoryArray.push(city);

  // Limit the search history to a certain number of items if desired
  const maxHistoryItems = 10; // Adjust as needed
  if (searchHistoryArray.length > maxHistoryItems) {
    searchHistoryArray.shift(); // Remove the oldest item
  }

  // Save the updated search history array to localStorage
  localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArray));

  // Display the updated search history on the page
  displaySearchHistory();
}


// Event listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = input.value.trim();

  if (city) {
    fetchWeatherData(city);
  }
});

// Initial setup to display search history
function displaySearchHistory() {
  // Clear previous search history items
  searchHistory.innerHTML = '';

  // Create a list item for each city in the search history array
  searchHistoryArray.forEach((city) => {
    const listItem = document.createElement('li');
    listItem.textContent = city;

    // Add a click event listener to each list item to allow users to re-search for the city
    listItem.addEventListener('click', () => {
      // When a list item is clicked, re-fetch weather data for the city
      fetchWeatherData(city);
    });

    // Append the list item to the search history
    searchHistory.appendChild(listItem);
  });
}


// Call the function to display search history on page load
displaySearchHistory();
