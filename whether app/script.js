document.getElementById('get-weather-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    getWeather(city);
});

document.getElementById('get-location-btn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoords(lat, lon);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function getWeather(city) {
    const apiKey = '85d5f0a59a95c37e6baca98c0f737bd2'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function getWeatherByCoords(lat, lon) {
    const apiKey = 'ec95a3194b2a2b854ac21719cf409b56'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('Location not found');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const city = data.name;
    const country = data.sys.country;

    weatherInfo.innerHTML = `
        <h2>${city}, ${country}</h2>
        <p>Temperature: ${temperature} °C</p>
        <p>Condition: ${description}</p>
        <div class="weather-details">
            <div>Humidity: ${humidity}%</div>
            <div>Wind Speed: ${windSpeed} m/s</div>
        </div>
    `;
}
