import { WEATHER } from "./weather.js";

export const FORM = (function () {
    const weather = WEATHER;
    // weather.fetchWeather("london");
    function init() {
        addEventListeners();
    }

    function addEventListeners() {
        const submit = document.getElementById("weather-form");
        submit.addEventListener("submit", (event) => {
            event.preventDefault();
            const location = document.getElementById("location").value;

            // causing a 400 error from visual crossing
            console.log(weather.fetchWeather("london"));
            const weatherReport = weather.fetchWeather(location);
            // weather report is printing out a Promise not the data
            console.log(weatherReport);
        });
    }

    return { init };
})();
