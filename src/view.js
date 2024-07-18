import { WEATHER } from "./weather.js";

export const FORM = (function () {
    const weather = WEATHER;
    // weather.fetchWeather("london");
    function init() {
        addEventListeners();
    }

    function addEventListeners() {
        const submit = document.getElementById("weather-form");
        submit.addEventListener("submit", async (event) => {
            event.preventDefault();
            const location = document.getElementById("location").value;

            try {
                const weatherReport = await weather.fetchWeather(location);
                console.log(weatherReport);
            } catch {
                console.error("Error fetching weather data:", error);
            }
        });
    }

    return { init };
})();
