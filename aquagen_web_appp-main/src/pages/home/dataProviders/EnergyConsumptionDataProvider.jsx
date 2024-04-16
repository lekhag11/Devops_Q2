import _ from 'lodash';
import moment from 'moment';
import { createContext, useContext, useEffect, useState } from 'react';
import Expanded from 'src/components/helper/Expanded';
import CustomLoader from 'src/components/loader/loader';
import { ConsumptionDataType } from 'src/enums/consumptionDataType';
import { LabelData } from 'src/utils/labelData';
import { constants } from 'src/constants/constants';
import { AppStoreContext } from 'src/store/AppStore';
import { HomeStoreContext } from 'src/store/HomeStore';
import { assets } from 'src/assets/assets';
import { AnalyticEvents } from 'src/enums/analyticsEnum';
import { AnalyticsService } from 'src/services/analytics/analyticsService';

const EnergyConsumptionDataContext = createContext({});

const EnergyConsumptionScreenDataProvider = ({ categoryId, children }) => {
    const homeStore = useContext(HomeStoreContext);
    const appStore = useContext(AppStoreContext);

    // id of the device for which we'll show the details page
    const [detailCategoryId, setDetailCategoryId] = useState();
    const [loading, setLoading] = useState(false);
    const [consumptionData, setConsumptionData] = useState({});
    const [params, setParams] = useState({
        date1: moment(new Date()).format('DD/MM/YYYY'),
        category: categoryId,
        type: 'HOUR',
    });
    const [comparisonMode, setComparisonMode] = useState(false);
    const [comparisonBox, setComparisonBox] = useState(false);
    const [consumptionDataType, setConsumptionDataType] = useState(
        ConsumptionDataType.HOURS
    );

    const colors = {
        mainColor: assets.colors.orange,
        comparisonColor: assets.colors.orangeSecondary,
    };

    async function init() {
        let filteredItem = appStore.loginData
            ? _.filter(appStore.loginData.services, {
                  categoryId: categoryId,
              })[0]
            : [];
        await homeStore.getCategoryData(filteredItem['categoryId'], params);
        consumptionData['data'] =
            homeStore.homeScreenData[categoryId][
                `${params.type}_${params.date1}`
            ];
        consumptionData['labelData'] = LabelData.getConsumptionLabelData(
            params,
            appStore?.loginData?.startDate
        );
        consumptionData['colors'] = colors;
        consumptionData['siUnit'] = filteredItem.siUnit;
        setConsumptionData({ ...consumptionData });
        if (consumptionData.labelData.date2 && comparisonBox) {
            setComparisonMode(true);
        }
        setLoading(false);
    }

    useEffect(() => {
        AnalyticsService.sendEvent(AnalyticEvents.PAGE_VIEW, {}, true);
    }, []);

    useEffect(() => {
        setLoading(true);
        init();
        const interval = setInterval(() => {
            init();
        }, constants.refreshDuration);

        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, [params]);

    const value = {
        consumptionData,
        comparisonMode,
        setComparisonMode,
        comparisonBox,
        setComparisonBox,
        params,
        setParams,
        loading,
        detailCategoryId,
        setDetailCategoryId,
        consumptionDataType,
        setConsumptionDataType,
    };

    if (homeStore.homeScreenData[categoryId]) {
        return (
            <EnergyConsumptionDataContext.Provider value={value}>
                {children}
            </EnergyConsumptionDataContext.Provider>
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

export { EnergyConsumptionDataContext, EnergyConsumptionScreenDataProvider };
