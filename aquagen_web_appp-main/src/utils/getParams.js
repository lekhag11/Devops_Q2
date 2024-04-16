import moment from 'moment';
import { ConsumptionDataType } from 'src/enums/consumptionDataType';
import { DateFormatter } from 'src/utils/dateFormatter';

const GetParamsData = {};

/**
 * @param {*Date} date - in moment format
 * @param {*strind} dataType - format of data Collection
 * @returns formatted date based type.
 */
GetParamsData.convertDateToStringBasedOnDataType = (date, dataType) => {
    if (!date && !dataType) return null;
    if (dataType === ConsumptionDataType.HOURS) {
        return DateFormatter.formatter(date);
    }
    if (dataType === ConsumptionDataType.DAYS) {
        return DateFormatter.formatter(DateFormatter.getStartDate(date));
    }
    if (dataType === ConsumptionDataType.MONTHS) {
        return DateFormatter.formatter(
            DateFormatter.getStartDate(date, 'year')
        );
    }
    if (dataType === ConsumptionDataType.YEARS) {
        return null;
    }
};

/**
 * @param {*Object} rawParams is in param format in which date values are moment() object
 * @returns param object which can be directly used to fetch values
 */
GetParamsData.rawParamsToParams = (rawParams) => {
    if (!rawParams) return;
    return {
        date1: GetParamsData.convertDateToStringBasedOnDataType(
            rawParams.date1 || moment(),
            rawParams.type
        ),
        date2: GetParamsData.convertDateToStringBasedOnDataType(
            rawParams.date2,
            rawParams.type
        ),
        type: rawParams.type,
        category: rawParams.category,
    };
};

/**
 * @param {*string} dataType - format of data Collection
 * @returns moment object based on dataType for toDate/date2
 */
GetParamsData.getToDateBasedOnType = (dataType) => {
    if (!dataType) return;
    if (dataType === ConsumptionDataType.HOURS) {
        return moment().subtract(1, 'd');
    }
    if (dataType === ConsumptionDataType.DAYS) {
        return DateFormatter.getStartDate(moment().subtract(1, 'M'));
    }
    if (dataType === ConsumptionDataType.MONTHS) {
        return DateFormatter.getStartDate(moment().subtract(1, 'Y'), 'year');
    }

    return null;
};

/**
 * @param {*string} dataType - format of data Collection
 * @returns current moment date object based on dataType
 */
GetParamsData.getDateBasedOnType = (date = moment(), dataType) => {
    if (!dataType) return;
    if (dataType === ConsumptionDataType.DAYS) {
        return DateFormatter.getStartDate(moment());
    }
    if (dataType === ConsumptionDataType.MONTHS) {
        return DateFormatter.getStartDate(moment(), 'year');
    }
    if (dataType === ConsumptionDataType.YEARS) {
        return DateFormatter.getStartDate(null);
    }
    return moment();
};

GetParamsData.getMinDate = (dataType, startDate) => {
    const momentStartDate = moment(startDate, 'DD/MM/YYYY');
    if (!dataType) return;
    if (dataType === ConsumptionDataType.DAYS) {
        return DateFormatter.getStartDate(momentStartDate);
    }
    if (dataType === ConsumptionDataType.MONTHS) {
        return DateFormatter.getStartDate(momentStartDate, 'year');
    }
    return momentStartDate;
};

export { GetParamsData };
