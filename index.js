document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-box button');
    const cityInput = document.querySelector('.input input');
    const cityNameElement = document.querySelector('.city-name h2');
    const temperatureElement = document.querySelector('.temperature');
    const descriptionElement = document.querySelector('.description');
    const humidityElement = document.querySelector('.weather-details-humidity span');
    const windSpeedElement = document.querySelector('.weather-details-wind span');

    searchButton.addEventListener('click', () => {
        const cityName = cityInput.value.trim();
        if (cityName) {
            fetchWeatherData(cityName);
        }
    });

    async function fetchWeatherData(city) {
        const apiKey = '5d1670301ad40fdd0809314ffcd82751'; // Your OpenWeatherMap API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            updateWeatherUI(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        }
    }

    function updateWeatherUI(data) {
        const { name, weather, main, wind } = data;
        
        // Update the city name
        cityNameElement.textContent = name;
        
        // Update the temperature
        temperatureElement.innerHTML = `${Math.round(main.temp)}<span>°C</span>`;
        
        // Update the weather description
        descriptionElement.textContent = weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);
        
        // Update the humidity
        humidityElement.textContent = `${main.humidity}%`;
        
        // Update the wind speed (convert m/s to km/h)
        windSpeedElement.textContent = `${Math.round(wind.speed * 3.6)} km/h`;
    }
});
