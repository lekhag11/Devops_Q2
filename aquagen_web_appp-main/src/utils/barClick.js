import { ConsumptionDataType } from "src/enums/consumptionDataType"
import { DateFormatter } from "src/utils/dateFormatter"
import moment from "moment"
const BarClick = {}

BarClick.handleBarClick = (labelData, xValue) => {
    const x = xValue?.payload?.x

    if (labelData.type === ConsumptionDataType.DAYS) {
        return {
            date1: DateFormatter.formatter(moment(`${x}/${labelData?.showMonth1}/${labelData?.showYear1}`)),
            category: labelData?.category,
            type: ConsumptionDataType.HOURS,
        }
    }
    else if (labelData.type === ConsumptionDataType.MONTHS) {
        return {
            date1: DateFormatter.formatter(moment(`01 / ${x} / ${labelData?.showYear1}`)),
            category: labelData?.category,
            type: ConsumptionDataType.DAYS,
        }
    }
    else if (labelData.type === ConsumptionDataType.YEARS) {
        return {
            date1: DateFormatter.formatter(moment(`01 / 01 / ${x}`)),
            category: labelData?.category,
            type: ConsumptionDataType.MONTHS,
        }
    }
}

export { BarClick }