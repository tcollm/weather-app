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
                // await renderWeatherBlock(location, weatherReport);
            } catch {
                console.error("Error fetching weather data:", error);
            }
        });
    }

    // generate html and pull textContent from weather array
    function renderWeatherBlock(location, weatherArr) {
        const weatherBlock = document.querySelector(".weather-block");

        // header
        const header = document.createElement("div");
        header.classList.add("header");
        weatherBlock.appendChild(header);

        const title = document.createElement("div");
        title.classList.add("title");
        header.appendChild(title);

        const h1 = document.createElement("h1");
        h1.textContent = "7 Day Weather";
        title.appendChild(h1);

        const locationDiv = document.createElement("div");
        locationDiv.id = "location";
        locationDiv.textContent = `- ${location}`;
        title.appendChild(locationDiv);

        const headerHr = document.createElement("hr");
        header.appendChild(headerHr);

        // day zero

        // other days
    }

    return { init };
})();
