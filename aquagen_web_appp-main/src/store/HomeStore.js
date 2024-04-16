import { createContext, useEffect, useState } from 'react';
import { constants } from 'src/constants/constants';
import { HomeController } from 'src/controllers/home/homeController';

const HomeStoreContext = createContext({});

const HomeStoreContextProvider = ({ children }) => {
    const [homeScreenData, setHomeScreenData] = useState({});
    const [notificationData, setNotificationData] = useState();
    const [startTour, setStartTour] = useState(false);

    async function getCategoryData(categoryId, params, cacheEnabled = false) {
        const cacheKey = `${params?.type}_${params?.date1}`;
        if (cacheEnabled) {
            const hasData = homeScreenData[categoryId][cacheKey];
            if (!hasData) {
                let data = await HomeController.getCategoryData(
                    categoryId,
                    params
                );
                homeScreenData[categoryId][cacheKey] = data;
                return;
            }
        } else {
            let data = await HomeController.getCategoryData(categoryId, params);

            homeScreenData[categoryId] = {};
            homeScreenData[categoryId][cacheKey] = data;
            setHomeScreenData({ ...homeScreenData });
        }
    }

    async function getNotificationData() {
        let data = await HomeController.getNotificationData();
        if (data) {
            setNotificationData(data);
        }
    }

    async function updateNotificationRead(request) {
        await HomeController.updateNotificationRead(request);
        getNotificationData();
    }

    const handleStartFeatureTour = () => {
        setStartTour(true);
    };

    const handleCloseTour = (event) => {
        if (event.action === 'reset') setStartTour(false);
    };

    useEffect(() => {
        getNotificationData();
        const interval = setInterval(() => {
            getNotificationData();
        }, constants.refreshDuration);

        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, []);

    const value = {
        homeScreenData,
        getCategoryData,
        notificationData,
        getNotificationData,
        startTour,
        setStartTour,
        updateNotificationRead,
        handleStartFeatureTour,
        handleCloseTour,
    };

    return (
        <HomeStoreContext.Provider value={value}>
            {children}
        </HomeStoreContext.Provider>
    );
};

export { HomeStoreContext, HomeStoreContextProvider };
