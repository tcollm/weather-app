import { WEATHER } from "./weather.js";
import { DATE } from "./date.js";

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

                renderWeatherBlock(location, weatherReport);
            } catch {
                console.error("Error fetching weather data:", error);
            }
        });
    }

    // generate html and pull textContent from weather array
    function renderWeatherBlock(location, weatherArr) {
        const body = document.querySelector("body");

        // Create the main weather block container
        const weatherBlock = document.createElement("div");
        weatherBlock.classList.add("weather-block");
        body.appendChild(weatherBlock);

        // Create and populate the header
        const header = document.createElement("div");
        header.classList.add("header");

        const title = document.createElement("div");
        title.classList.add("title");

        const h1 = document.createElement("h1");
        h1.textContent = "7 Day Weather";

        const locationDiv = document.createElement("div");
        locationDiv.id = "location";
        locationDiv.textContent = `- ${location}`;

        const headerHr = document.createElement("hr");

        title.appendChild(h1);
        title.appendChild(locationDiv);
        header.appendChild(title);
        header.appendChild(headerHr);
        weatherBlock.appendChild(header);

        // ZERO
        const zero = document.createElement("div");
        zero.classList.add("day");
        zero.id = "zero";
        weatherBlock.appendChild(zero);

        const date = document.createElement("div");
        date.id = "date";
        date.textContent = DATE.formatDate(weatherArr[0].date);

        zero.appendChild(date);

        const dayCont = document.createElement("div");
        dayCont.classList.add("day-container");

        const leftDiv = document.createElement("div");
        leftDiv.id = "left";

        const tempDiv = document.createElement("div");
        tempDiv.id = "temp";
        tempDiv.textContent = weatherArr[0].temp;

        const logoDiv = document.createElement("div");
        // TODO: get logo based on conditions (create new file for this functionality)
        logoDiv.textContent = "*Logo*";

        leftDiv.appendChild(tempDiv);
        leftDiv.appendChild(logoDiv);

        const rightDiv = document.createElement("div");
        rightDiv.id = "right";

        const maxMinDiv = document.createElement("div");

        const zeroMax = document.createElement("strong");
        zeroMax.textContent = weatherArr[0].tempMax;

        const textNode = document.createTextNode(`/${weatherArr[0].tempMin}`);

        maxMinDiv.appendChild(zeroMax);
        maxMinDiv.appendChild(textNode);
        rightDiv.appendChild(maxMinDiv);

        dayCont.appendChild(leftDiv);
        dayCont.appendChild(rightDiv);

        zero.appendChild(dayCont);

        const zeroDesc = document.createElement("div");
        zeroDesc.textContent = "";
        zero.appendChild(zeroDesc);

        const zeroHr = document.createElement("hr");
        weatherBlock.appendChild(zeroHr);

        // DAY ONE - SIX
    }

    return { init };
})();
