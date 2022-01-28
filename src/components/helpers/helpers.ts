import moment from "moment";
import NumberFormat from 'react-number-format';

export const scrollTo = (to: number) => {
    window.scrollTo({
        top: to,
        behavior: "smooth"
    });
};

export const getFuturesTabs = () => {
    const FUTURES_COUNT = 52;
    const EXPIRY_DAYS = [1, 14];

    const futuresTabs = [];

    let nextFutureExpiry = moment();

    // Calculate next future expiries
    while (FUTURES_COUNT > futuresTabs.length) {
        if (EXPIRY_DAYS.includes(nextFutureExpiry.date())) {
            futuresTabs.push(nextFutureExpiry.format("DD-MMM-YY"));
        }
        nextFutureExpiry.add(1, "days");
    };

    return [
        "Live",
        ...futuresTabs,
    ];
};