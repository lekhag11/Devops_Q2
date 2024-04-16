import moment from 'moment';

const DateFormatter = {};

/**
 * Format a date object to a string using the specified format.
 * @param {Date} value - The date to format.
 * @param {string} format - The format for the resulting string (default: 'DD/MM/YYYY').
 * @returns {string | undefined} - The formatted date string or undefined if the input is falsy.
 */
DateFormatter.formatter = (value, format = 'DD/MM/YYYY') => {
    return value ? moment(value.toString()).format(format) : undefined;
};

DateFormatter.customFormatter = (
    value,
    inputFormat = 'DD/MM/YYYY',
    outputFormat = 'DD/MM/YYYY'
) => {
    return value
        ? moment(value.toString(), inputFormat).format(outputFormat)
        : undefined;
};

/**
 * Get the start date of a given time period (e.g., month) for a date.
 * @param {Date} value - The date to calculate the start date from.
 * @param {string} time - The time period to start (default: 'month').
 * @returns {Date | undefined} - The start date or undefined if the input is falsy.
 */
DateFormatter.getStartDate = (value, time = 'month') => {
    return value ? moment(value).startOf(time) : undefined;
};

/**
 * Parse a date string to a JavaScript Date object using the specified format.
 * @param {string} value - The date string to parse.
 * @param {string} format - The format of the date string (default: 'DD/MM/YYYY').
 * @returns {Date | undefined} - The parsed Date object or undefined if the input is falsy.
 */
DateFormatter.stringToDate = (value, format = 'DD/MM/YYYY') => {
    return value ? moment(value, format).toDate() : undefined;
};

/**
 *
 * @param {string} date - dd/mm/yyyy format
 * @param {string} checkType - year, month or day
 * @returns Boolean
 */

DateFormatter.isSame = (date, checkType = 'day') => {
    return moment().isSame(moment(date, 'DD/MM/YYYY'), checkType);
};

export { DateFormatter };
