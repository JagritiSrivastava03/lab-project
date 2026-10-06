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
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`
        );

        const weatherData = await weatherResponse.json();

        const temperature = weatherData.current.temperature_2m;
        const windSpeed = weatherData.current.wind_speed_10m;

        result.innerHTML = `
            <h2>${cityName}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Wind Speed: ${windSpeed} km/h</p>
        `;

    } catch (error) {

        result.innerHTML = "<p>Unable to fetch weather data.</p>";
    }
}