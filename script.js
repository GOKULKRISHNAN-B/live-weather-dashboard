const apiKey = "7973fa9305d1d9e764fe7cb9768d31de";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("error-msg");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

// Allow user to press 'Enter' key to search
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) fetchWeather(city);
    }
});

async function fetchWeather(city) {
    // 1. Show loading state, hide previous data/errors
    loading.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
    errorMsg.classList.add("hidden");

    const apiUrl = `https://openweathermap.org{city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        errorMsg.classList.remove("hidden");
    } finally {
        // 2. Hide loading state when fetch finishes
        loading.classList.add("hidden");
    }
}

function displayWeather(data) {
    document.getElementById("city-name").innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById("weather-desc").innerText = data.weather[0].description;
    document.getElementById("temperature").innerText = Math.round(data.main.temp);
    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("wind-speed").innerText = data.wind.speed;

    // Show the weather display card
    weatherInfo.classList.remove("hidden");
}