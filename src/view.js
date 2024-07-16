import { WEATHER } from "./weather.js";

const FORM = function () {
    const weather = WEATHER;
    // weather.fetchWeather("london");
    function init() {
        addEventListeners;
    }

    function addEventListeners() {
        const submit = document.getElementById("weatherForm");
        submit.addEventListener("submit", (event) => {
            event.preventDefault();
            const location = document.getElementById("location").value;
            console.log(location);
        });
    }

    return { init };
};
