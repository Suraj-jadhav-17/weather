const apiKey = '55eaa2621c18350d689e7bfdb6c53673'; 
const weatherResult = document.getElementById('weatherResult');
const forecastResult = document.getElementById('forecastResult');
const searchHistory = document.getElementById('searchHistory');
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeatherData(city);
        cityInput.value = '';
    }
});
function fetchWeatherData(city) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            fetchForecastData(city);
            updateSearchHistory(city);
        })
        .catch(error => {
            weatherResult.innerHTML = `<p>${error.message}</p>`;
        });
}
function displayWeather(data) {
    const { name, main, weather } = data;
    weatherResult.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Weather: ${weather[0].description}</p>
    `;
}
function fetchForecastData(city) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        });
}
function displayForecast(data) {
    forecastResult.innerHTML = '<h3>5-Day Forecast</h3>';
    data.list.forEach((item, index) => {
        if (index % 8 === 0) { 
            const { dt_txt, main, weather } = item;
            forecastResult.innerHTML += `
                <div>
                    <p>${dt_txt}</p>
                    <p>Temperature: ${main.temp} °C</p>
                    <p>Weather: ${weather[0].description}</p>
                </div>
            `;
        }
    });
}
function updateSearchHistory(city) {
    const historyItem = document.createElement('div');
    historyItem.textContent = city;
    searchHistory.appendChild(historyItem);
}