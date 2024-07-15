import moment from "moment";

export const WEATHER = (function () {
    function getDate() {
        const date = moment();
        const currDate = date.format("YYYY-MM-DD");
        const nextDate = date.add(7, "days").format("YYYY-MM-DD");

        return [currDate, nextDate];
    }

    async function fetchWeather(location = "golden") {
        const [cDate, nDate] = getDate();

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
        } catch (err) {
            console.error(err);
        }
    }

    return { fetchWeather };
})();
