import { WEATHER } from "./weather.js";
import { DATE } from "./date.js";

export const FORM = (function () {
    const weather = WEATHER;
    // weather.fetchWeather("london");
    function init() {
        addEventListeners();
    }

    function capitalizeFirst(str) {
        str.toLowerCase();
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function addEventListeners() {
        const submit = document.getElementById("weather-form");
        submit.addEventListener("submit", async (event) => {
            event.preventDefault();
            const location = document.getElementById("location").value;

            try {
                const weatherReport = await weather.fetchWeather(location);
                // console.log(weatherReport);

                renderWeatherBlock(location, weatherReport);
            } catch {
                console.error("Error fetching weather data:", error);
            }
        });
    }

    // generate html and pull textContent from weather array
    function renderWeatherBlock(location, weatherArr) {
        const wrapper = document.querySelector(".weather-block-wrapper");
        wrapper.innerHTML = "";

        const weatherBlock = document.createElement("div");
        weatherBlock.classList.add("weather-block");
        wrapper.appendChild(weatherBlock);

        const header = document.createElement("div");
        header.classList.add("header");

        const title = document.createElement("div");
        title.classList.add("title");

        const h1 = document.createElement("h1");
        h1.textContent = "7 Day Weather";

        const locationDiv = document.createElement("div");
        locationDiv.id = "location";
        const formattedLoc = capitalizeFirst(location);
        locationDiv.textContent = `- ${formattedLoc}`;

        const headerHr = document.createElement("hr");

        title.appendChild(h1);
        title.appendChild(locationDiv);
        header.appendChild(title);
        header.appendChild(headerHr);
        weatherBlock.appendChild(header);

        // DAY ZERO
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
        tempDiv.textContent = `${weatherArr[0].temp}\u00B0`;

        const logoDiv = document.createElement("div");
        // TODO: get logo based on conditions (create new file for this functionality)
        logoDiv.textContent = "*Logo*";

        leftDiv.appendChild(tempDiv);
        leftDiv.appendChild(logoDiv);

        const rightDiv = document.createElement("div");
        rightDiv.id = "right";

        const maxMinDiv = document.createElement("div");

        const zeroMax = document.createElement("strong");
        zeroMax.textContent = `${weatherArr[0].tempMax}\u00B0 `;

        const textNode = document.createTextNode(
            `/ ${weatherArr[0].tempMin}\u00B0`
        );

        maxMinDiv.appendChild(zeroMax);
        maxMinDiv.appendChild(textNode);
        rightDiv.appendChild(maxMinDiv);

        dayCont.appendChild(leftDiv);
        dayCont.appendChild(rightDiv);

        zero.appendChild(dayCont);

        const zeroDesc = document.createElement("div");
        zeroDesc.textContent = weatherArr[0].conditions;
        zero.appendChild(zeroDesc);

        const zeroHr = document.createElement("hr");
        weatherBlock.appendChild(zeroHr);

        // DAY ONE - SIX
        for (let i = 1; i <= 6; i++) {
            // Create the day div and set its id
            const dayDiv = document.createElement("div");
            dayDiv.className = "day";
            dayDiv.id = i.toString();

            const dateDiv = document.createElement("div");
            dateDiv.textContent = DATE.formatDate(weatherArr[i].date);
            dayDiv.appendChild(dateDiv);

            const tempDiv = document.createElement("div");
            dayDiv.appendChild(tempDiv);

            const maxMinDiv = document.createElement("div");

            const max = document.createElement("strong");
            max.textContent = `${weatherArr[i].tempMax}\u00B0 `;

            const min = document.createTextNode(
                `/ ${weatherArr[i].tempMin}\u00B0`
            );

            maxMinDiv.appendChild(max);
            maxMinDiv.appendChild(min);
            tempDiv.appendChild(maxMinDiv);

            const logoDiv = document.createElement("div");
            logoDiv.textContent = "*Logo*";
            dayDiv.appendChild(logoDiv);

            const descDiv = document.createElement("div");
            descDiv.textContent = weatherArr[i].conditions;
            dayDiv.appendChild(descDiv);

            weatherBlock.appendChild(dayDiv);

            const hr = document.createElement("hr");
            weatherBlock.appendChild(hr);
        }
    }

    return { init };
})();
