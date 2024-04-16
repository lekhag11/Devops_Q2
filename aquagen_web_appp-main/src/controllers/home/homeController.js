import { HomeDataSource } from 'src/dataSource/home';

async function getCategoryData(categoryId, params) {
    return await HomeDataSource.getCategoryData(categoryId, params);
}

async function getNotificationData() {
    return await HomeDataSource.getNotificationData();
}

async function updateNotificationRead(request) {
    return await HomeDataSource.updateNotificationRead(request);
}

const HomeController = {
    getCategoryData: getCategoryData,
    getNotificationData: getNotificationData,
    updateNotificationRead: updateNotificationRead,
};

export { HomeController };
