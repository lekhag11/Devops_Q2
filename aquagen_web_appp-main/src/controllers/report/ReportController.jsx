import { DateFormatter } from 'src/utils/dateFormatter';
import { AnalyticsService } from 'src/services/analytics/analyticsService';
import { AnalyticEvents } from 'src/enums/analyticsEnum';
import { Urls } from 'src/services/api/urls';

const downloadReport = async (
    category,
    selectedReportType,
    reportFormat,
    startDate,
    endDate,
    unitId,
    appStore
) => {
    startDate = DateFormatter.formatter(startDate, 'DD/MM/YYYY');
    endDate = DateFormatter.formatter(endDate, 'DD/MM/YYYY');
    const USER_TOKEN = appStore.loginData.token.replaceAll('Bearer ', '');
    const monthlyReporturl = `${Urls.baseUrl}report?useShift=true&reportType=${selectedReportType}&reportFormat=${reportFormat}&service=${category}&jwt=${USER_TOKEN}&startDate=${startDate}&endDate=${endDate}&unitId=${unitId}`;

    AnalyticsService.sendEvent(AnalyticEvents.REPORTS_DOWNLOAD, {
        selectedReportType,
        reportFormat,
        startDate,
        endDate,
        monthlyReporturl,
    });

    window.open(monthlyReporturl, '_blank', 'noreferrer');
};

const ReportController = {
    downloadReport,
};

export default ReportController;
