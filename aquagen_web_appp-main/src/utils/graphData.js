import { Formatter } from 'src/utils/formatter';

// calculating Total Graph Data from Individual units
function getTotalGraphData(units) {
    const result = [];

    units.forEach((unit) => {
        unit.graph1?.forEach((point) => {
            const existingData = result.find((data) => data.xValue === point.x);
            if (existingData) {
                existingData.yValue1 += point.y || 0;
            } else {
                result.push({
                    xValue: point.x,
                    yValue1: point.y || 0,
                    yValue2: 0,
                });
            }
        });
        unit.graph2?.forEach((point) => {
            const existingData = result.find((data) => data.xValue === point.x);
            if (existingData) {
                existingData.yValue2 += point.y || 0;
            } else {
                result.push({
                    xValue: point.x,
                    yValue1: 0,
                    yValue2: point.y || 0,
                });
            }
        });
    });

    return result;
}

/**
 * get bar graphData.
 * @param {*object which will contain graph data array } unit
 * @returns array for ploting bar graph
 */

const getBarGraphData = (unit) => {
    let result = [];

    // Helper function to update or push data to the result array
    const updateOrPushData = (point, y1 = 0, y2 = 0) => {
        const existingData = result.find(
            (data) => data.x === (point.x2 || point.x)
        );
        if (existingData) {
            existingData.y1 += y1;
            existingData.y2 += y2;
        } else {
            result.push({
                x: point.x2 || point.x,
                y1: y1,
                y2: y2,
                tooltip: point.tooltip,
            });
        }
    };

    if (unit?.graph1 && unit?.graph1.length !== 0) {
        unit.graph1.forEach((point1) => {
            updateOrPushData(point1, point1.y);
        });
    }

    if (unit?.graph2 && unit?.graph2.length !== 0) {
        unit.graph2.forEach((point2) => {
            updateOrPushData(point2, 0, point2.y);
        });
    }

    return result;
};

/**
 * get pie chart data
 * @param {*array of objects which contains graph data array } units
 * @param {*string key of object for which data is needed } value
 * @returns array for ploting pie charts
 */

const getPieChartData = (units, value = 'value1') => {
    const result = units?.map((unit) => {
        return {
            name: unit.displayName,
            value: Number(Formatter.valueFormatter(unit[value], 0, 0) || 0),
        };
    });

    return result;
};

/**
 * get pie chart data with percentage of each category
 * @param {*array of objects which contains graph data array } units
 * @param {*string key of object for which data is needed } value
 * @returns array for ploting pie charts
 */

const getPieChartDataBasedOnPercentage = (units, value = 'value1') => {
    const total = units?.reduce(
        (sum, unit) =>
            sum + Number(Formatter.valueFormatter(unit[value], 0, 0) || 0),
        0
    );

    const result = units?.map((unit) => {
        const unitValue = Number(
            Formatter.valueFormatter(unit[value], 0, 0) || 0
        );
        const percentage = (unitValue / total) * 100;

        return {
            name: unit.displayName,
            value: unitValue,
            percentage: Number(Formatter.valueFormatter(percentage, 0, 0)),
        };
    });

    return result;
};
/**
 * get pie chart data with percentage with top 3 values
 * @param {*array of objects which contains graph data array } units
 * @param {*string key of object for which data is needed } value
 * @returns array for ploting pie charts
 */

const getPieChartDataBasedTopThreeValues = (units, value = 'value1') => {
    const total = units.reduce(
        (sum, unit) =>
            sum + Number(Formatter.valueFormatter(unit[value], 0, 0) || 0),
        0
    );

    const result = units.map((unit) => {
        const unitValue = Number(
            Formatter.valueFormatter(unit[value], 0, 0) || 0
        );
        const percentage = (unitValue / total) * 100;

        return {
            name: unit.displayName,
            value: unitValue,
            percentage: Number(Formatter.valueFormatter(percentage, 0, 0)),
        };
    });

    result.sort((a, b) => b.percentage - a.percentage);

    for (let i = 3; i < result.length; i++) {
        result[i].percentage = null;
    }

    return result;
};

export {
    getTotalGraphData,
    getBarGraphData,
    getPieChartData,
    getPieChartDataBasedOnPercentage,
    getPieChartDataBasedTopThreeValues,
};
