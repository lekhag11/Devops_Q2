import _ from 'lodash';
import moment from 'moment';
import { createContext, useContext, useEffect, useState } from 'react';
import Expanded from 'src/components/helper/Expanded';
import CustomLoader from 'src/components/loader/loader';
import { constants } from 'src/constants/constants';
import { AnalyticEvents } from 'src/enums/analyticsEnum';
import { AnalyticsService } from 'src/services/analytics/analyticsService';
import { AppStoreContext } from 'src/store/AppStore';
import { HomeStoreContext } from 'src/store/HomeStore';

const QualityDataContext = createContext({});

const QualityScreenDataProvider = ({ categoryId, children }) => {
    const homeStore = useContext(HomeStoreContext);
    const appStore = useContext(AppStoreContext);

    const [qualityData, setQualityData] = useState({});
    const [params, setParams] = useState({
        date1: moment(new Date()).format('DD/MM/YYYY'),
        category: categoryId,
        type: 'HOUR',
    });

    async function init() {
        let filteredItem = appStore.loginData
            ? _.filter(appStore.loginData.services, {
                  categoryId: categoryId,
              })[0]
            : [];

        await homeStore.getCategoryData(filteredItem['categoryId'], params);
        qualityData['data'] =
            homeStore.homeScreenData[categoryId][
                `${params.type}_${params.date1}`
            ];
        setQualityData({ ...qualityData });
    }

    useEffect(() => {
        AnalyticsService.sendEvent(AnalyticEvents.PAGE_VIEW, {}, true);
    }, []);

    useEffect(() => {
        init();
        const interval = setInterval(() => {
            init();
        }, constants.refreshDuration);

        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, []);

    if (homeStore.homeScreenData[categoryId]) {
        return (
            <QualityDataContext.Provider value={{ qualityData, setParams }}>
                {children}
            </QualityDataContext.Provider>
        );
    } else {
        return (
            <Expanded
                extraSx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '90vh',
                }}
            >
                <CustomLoader />
            </Expanded>
        );
    }
};

export { QualityDataContext, QualityScreenDataProvider };
