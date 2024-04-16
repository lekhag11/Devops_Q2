var Formatter = {};

// TODO Add more formatting functions.

Formatter.valueFormatter = (
    value,
    index,
    defaultDivident = 2,
    defaultValue = '0.00'
) => {
    // index is for graph formater
    // as it sends value and index one after Another

    return value?.toFixed(defaultDivident) || defaultValue;
};

Formatter.defaultValue = (value, defaultValue = '--') => {
    return value || defaultValue;
};

export { Formatter };
