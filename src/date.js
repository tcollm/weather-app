import moment from "moment";

export const DATE = (function () {
    function getDate() {
        const date = moment();
        const currDate = date.format("YYYY-MM-DD");
        const nextDate = date.add(7, "days").format("YYYY-MM-DD");

        return [currDate, nextDate];
    }

    function formatDate(dateString) {
        return moment(dateString, "YYYY-MM-DD").format("MMMM DD");
    }

    return {
        getDate,
        formatDate,
    };
})();
