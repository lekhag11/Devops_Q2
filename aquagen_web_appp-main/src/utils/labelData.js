import { ConsumptionDataType } from 'src/enums/consumptionDataType';
import { DateFormatter } from 'src/utils/dateFormatter';

const LabelData = {};

LabelData.getConsumptionLabelData = (params, startDate) => {
    const object = {
        ...params,
        startDate: DateFormatter.formatter(
            DateFormatter.stringToDate(startDate)
        ),
        showDate1: DateFormatter.formatter(
            DateFormatter.stringToDate(params?.date1),
            'DD'
        ),
        showDate2: DateFormatter.formatter(
            DateFormatter.stringToDate(params?.date2),
            'DD'
        ),
        showMonth1: DateFormatter.formatter(
            DateFormatter.stringToDate(params?.date1),
            'MMM'
        ),
        showMonth2: DateFormatter.formatter(
            DateFormatter.stringToDate(params?.date2),
            'MMM'
        ),
        showYear1: DateFormatter.formatter(
            DateFormatter.stringToDate(params?.date1),
            'YYYY'
        ),
        showYear2: DateFormatter.formatter(
            DateFormatter.stringToDate(params?.date2),
            'YYYY'
        ),
    };

    if (params.type === ConsumptionDataType.HOURS) {
        return {
            ...object,
            label: 'Hours',
            dateLabel1: object.date1,
            dateLabel2: object.date2,
        };
    } else if (params.type === ConsumptionDataType.DAYS) {
        return {
            ...object,
            label: 'Days',
            dateLabel1: `${object.showMonth1} ${object.showYear1}`,
            dateLabel2: `${object.showMonth2} ${object.showYear2}`,
        };
    } else if (params.type === ConsumptionDataType.MONTHS) {
        return {
            ...object,
            label: 'Months',
            dateLabel1: `${object.showYear1}`,
            dateLabel2: `${object.showYear2}`,
        };
    } else if (params.type === ConsumptionDataType.YEARS) {
        return {
            ...object,
            label: 'Years',
            dateLabel1: `${DateFormatter.formatter(
                DateFormatter.stringToDate(startDate),
                'YYYY'
            )} - ${DateFormatter.formatter(new Date(), 'YYYY')}`,
            dateLabel2: `${DateFormatter.formatter(
                DateFormatter.stringToDate(startDate),
                'YYYY'
            )} - ${DateFormatter.formatter(new Date(), 'YYYY')}`,
        };
    }
};

export { LabelData };
