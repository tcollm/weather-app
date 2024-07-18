import { DATE } from "./date";

export const WEATHER = (function () {
    async function fetchWeather(location = "golden") {
        const [cDate, nDate] = DATE.getDate();

        try {
            const response = await fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${cDate}/${nDate}?key=FJDRFAEFK3D34979W8FTUPFHC`,
                { mode: "cors" }
            );

            if (!response.ok) {
                throw new Error("Network response failed.");
            }

            const weatherData = await response.json();

            if (!weatherData) {
                throw new Error("Failed to get weather data json file.");
            }

            // format weather array
            const weatherArr = weatherData.days.map((day) => {
                return {
                    date: day.datetime,
                    conditions: day.conditions,
                    temp: day.temp,
                    tempMax: day.tempmax,
                    tempMin: day.tempmin,
                };
            });

            return weatherArr;
        } catch (err) {
            console.error(err);
        }
    }

    return { fetchWeather };
})();
