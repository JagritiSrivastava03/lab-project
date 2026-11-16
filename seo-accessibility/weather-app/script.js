async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();
    const result = document.getElementById("weatherResult");

    if (city === "") {
        result.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    try {

        // Get city coordinates
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results) {
            result.innerHTML = "<p>City not found.</p>";
            return;
        }

        const latitude = locationData.results[0].latitude;
        const longitude = locationData.results[0].longitude;
        const cityName = locationData.results[0].name;

        // Get weather data
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code`
        );

        const weatherData = await weatherResponse.json();

        const temperature = weatherData.current.temperature_2m;
        const windSpeed = weatherData.current.wind_speed_10m;
        const weatherCode = weatherData.current.weather_code;

        let condition = "Unknown";
        let weatherIcon = "🌍";

        if (weatherCode === 0) {
            condition = "Clear Sky";
            weatherIcon = "☀️";
        } else if (weatherCode >= 1 && weatherCode <= 3) {
            condition = "Partly Cloudy";
            weatherIcon = "🌤️";
        } else if (weatherCode >= 51 && weatherCode <= 67) {
            condition = "Rain";
            weatherIcon = "🌧️";
        } else if (weatherCode >= 71 && weatherCode <= 77) {
            condition = "Snow";
            weatherIcon = "❄️";
        } else if (weatherCode >= 80 && weatherCode <= 82) {
            condition = "Rain Showers";
            weatherIcon = "🌦️";
        } else if (weatherCode >= 95) {
            condition = "Thunderstorm";
            weatherIcon = "⛈️";
        }

        // Display weather
        result.innerHTML = `
            <h2>${cityName}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Wind Speed: ${windSpeed} km/h</p>
            <p>Condition: ${condition}</p>
        `;

    } catch (error) {

        result.innerHTML = "<p>Unable to fetch weather data.</p>";
    }
}