import _ from 'lodash';
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import Expanded from 'src/components/helper/Expanded';
import CustomLoader from 'src/components/loader/loader';
import { AppStoreContext } from 'src/store/AppStore';
import { HomeStoreContext } from 'src/store/HomeStore';
import { LabelData } from 'src/utils/labelData';
import moment from 'moment';

const ClickableGraphDataContext = createContext({});

const ClickableGraphDataProvider = ({ categoryId, children }) => {
    const homeStore = useContext(HomeStoreContext);
    const appStore = useContext(AppStoreContext);

    const [elementData, setElementData] = useState();
    const categoryGraphElementId = useRef();
    const unitGraphElementId = useRef();
    const clickableGraphDataType = useRef();
    const paramStack = useRef([]);

    const [loading, setLoading] = useState(false);
    const [graphData, setGraphData] = useState({});
    const [disabledBackButton, setDisabledBackButton] = useState(false);
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

        await homeStore.getCategoryData(
            filteredItem['categoryId'],
            params,
            true
        );
        graphData['data'] =
            homeStore.homeScreenData[categoryId][
                `${params.type}_${params.date1}`
            ];
        graphData['labelData'] = LabelData.getConsumptionLabelData(
            params,
            appStore?.loginData?.startDate
        );
        graphData['siUnit'] = filteredItem.siUnit;

        if (graphData.data?.subCategories) {
            const unitsArray = _.filter(graphData.data?.subCategories, {
                id: categoryGraphElementId.current,
            })[0];

            if (unitGraphElementId.current) {
                setElementData(
                    _.filter(unitsArray?.units, {
                        unitId: unitGraphElementId.current,
                    })[0]
                );
            } else {
                setElementData(unitsArray);
            }
        }
        setGraphData({ ...graphData });
    }

    useEffect(() => {
        init();
        clickableGraphDataType.current = params?.type;
        // eslint-disable-next-line
    }, [params]);

    useEffect(() => {
        setLoading(false);
        // eslint-disable-next-line
    }, [elementData]);

    const value = {
        graphData,
        setParams,
        loading,
        setLoading,
        elementData,
        clickableGraphDataType,
        categoryGraphElementId,
        unitGraphElementId,
        disabledBackButton,
        setDisabledBackButton,
        paramStack,
    };

    if (homeStore.homeScreenData[categoryId]) {
        return (
            <ClickableGraphDataContext.Provider value={value}>
                {children}
            </ClickableGraphDataContext.Provider>
        );
    } else {
        return (
            <Expanded
                extraSx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CustomLoader />
            </Expanded>
        );
    }
};

export { ClickableGraphDataContext, ClickableGraphDataProvider };
