import "./styles.css";
import { WEATHER } from "./weather.js";

document.addEventListener("DOMContentLoaded", () => {
    const weather = WEATHER;

    weather.fetchWeather("london");
});
