import { constants } from 'src/constants/constants';
import { StandardCategoryReportType } from 'src/enums/categoryType';

class Url {
    get baseUrl() {
        switch (constants.currentEnv) {
            case constants.env.prod:
                return 'https://prod-aquagen.azurewebsites.net/api/user/';
            case constants.env.dev:
                return 'https://dev-aquagenapi.azurewebsites.net/api/user/';
            case constants.env.local:
                return 'http://localhost:5001/api/user/';
            case constants.env.ngrok:
                return 'https://5ad7-103-171-99-42.ngrok-free.app/api/user/';
            default:
                return 'https://aquzgenapi.azurewebsites.net/api/user/';
        }
    }

    get azureADRedirectUrl() {
        switch (constants.azureAdEnv) {
            case constants.env.prod:
                return 'https://web.aquagen.co.in/';
            case constants.env.dev:
                return 'https://dev-aquagen.web.app/';
            case constants.env.local:
                return 'http://localhost:3000/';
            case constants.env.ngrok:
                return 'https://5ad7-103-171-99-42.ngrok-free.app/';
            default:
                return 'https://web.aquagen.co.in/';
        }
    }

    get login() {
        return 'user/login';
    }

    get otpPhnCheck() {
        return 'user/otplogin';
    }

    get categoryData() {
        return 'deviceData/';
    }

    get notificationData() {
        return 'notification/';
    }

    get updateNotificationRead() {
        return 'notification/updateRead';
    }

    get accountSettingsUpdate() {
        return 'accounts/settings';
    }

    get accountSettingsLogoUpdate() {
        return '/accounts/logoupdate';
    }

    get accountDetails() {
        return 'accounts/landingpage';
    }

    get refreshToken() {
        return 'user/refresh';
    }

    get waterBalanceData() {
        return 'waterBalance/data';
    }

    reportUrl(
        industryId,
        standardCategory,
        reportType,
        reportFormat,
        startData,
        endDate,
        unitId
    ) {
        //TODO Change to actual urls based on env later
        return `https://aquzgenapi.azurewebsites.net/aquagen/v1/industries/${industryId}/report/${
            StandardCategoryReportType[standardCategory]
        }/${reportType}/${reportFormat}?timezone=Asia/Kolkata&startDate=${startData}${
            endDate ? `&endDate=${endDate}` : ''
        }${unitId ? `&unitId=${unitId}` : ''}`;
    }
}

const Urls = new Url();

export { Urls };
