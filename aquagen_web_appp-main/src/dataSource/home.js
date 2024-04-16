import moment from 'moment';
import { apiClient } from 'src/services/api/apiClient';
import { Urls } from 'src/services/api/urls';

async function getCategoryData(categoryId, params) {
    if (!params) {
        params = {
            date1: moment(new Date()).format('DD/MM/YYYY'),
            category: categoryId,
            type: 'HOUR',
        };
    }
    let caetgoryDataResponse = await apiClient.get(Urls.categoryData, params);
    if (caetgoryDataResponse) {
        return caetgoryDataResponse.data;
    }
}

async function getNotificationData() {
    let notificationDataResponse = await apiClient.get(Urls.notificationData);
    if (notificationDataResponse) {
        return notificationDataResponse.data;
    }
}

async function updateNotificationRead(request) {
    await apiClient.patch(Urls.updateNotificationRead, {
        notifications: [request],
    });
}

const HomeDataSource = {
    getCategoryData: getCategoryData,
    getNotificationData: getNotificationData,
    updateNotificationRead: updateNotificationRead,
};

export { HomeDataSource };
