import _ from 'lodash';
import { createContext, useContext, useEffect, useState } from 'react';
import Expanded from 'src/components/helper/Expanded';
import CustomLoader from 'src/components/loader/loader';
import { constants } from 'src/constants/constants';
import { AppStoreContext } from 'src/store/AppStore';
import { HomeStoreContext } from 'src/store/HomeStore';
import moment from 'moment';
import { AnalyticsService } from 'src/services/analytics/analyticsService';
import { AnalyticEvents } from 'src/enums/analyticsEnum';

const LevelDataContext = createContext({});

const LevelScreenDataProvider = ({ categoryId, children }) => {
    const homeStore = useContext(HomeStoreContext);
    const appStore = useContext(AppStoreContext);

    let [levelData, setLevelData] = useState(undefined);
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

        if (homeStore.homeScreenData[categoryId]) {
            if (!levelData) {
                levelData = {};
            }

            levelData['data'] =
                homeStore.homeScreenData[categoryId][
                    `${params.type}_${params.date1}`
                ];
            setLevelData({ ...levelData });
        }
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

    if (levelData) {
        return (
            <LevelDataContext.Provider value={{ levelData, setParams }}>
                {children}
            </LevelDataContext.Provider>
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

export { LevelDataContext, LevelScreenDataProvider };
