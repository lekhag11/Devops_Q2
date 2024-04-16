import React, { createContext, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { WaterBalanceContoller } from 'src/controllers/waterBalance/waterBalanceContoller';
import { constants } from 'src/constants/constants';
import { DateFormatter } from 'src/utils/dateFormatter';

const WaterBalanceDataContext = createContext({});

const WaterBalanceDataProvider = ({ children }) => {
    const [balanceData, setBalanceData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [fullScreenLoader, setFullScreenLoader] = useState(false);
    const [openDownloadPopup, setOpenDownloadPopup] = useState(false);
    const [params, setParams] = useState({
        date1: moment(new Date()).format('DD/MM/YYYY'),
    });

    const downloadContainerRef = useRef();

    const [openInfoPopup, setOpenInfoPopup] = useState(false);

    async function init() {
        const response = await WaterBalanceContoller.waterBalanceData(params);
        if (response) {
            balanceData['data'] = response.data;
            balanceData['siUnit'] = response.data.siUnit;
            setBalanceData({ ...balanceData });
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (!isLoading) {
            setOpenInfoPopup(!balanceData.data);
        }
        //eslint-disable-next-line
    }, [isLoading]);

    useEffect(() => {
        init();

        if (!DateFormatter.isSame(params.date1)) return;

        const interval = setInterval(() => {
            init();
        }, constants.refreshDuration);
        return () => clearInterval(interval);

        // eslint-disable-next-line
    }, [params]);

    const value = {
        balanceData,
        params,
        setParams,
        isLoading,
        setIsLoading,
        openInfoPopup,
        setOpenInfoPopup,
        fullScreenLoader,
        setFullScreenLoader,
        downloadContainerRef,
        openDownloadPopup,
        setOpenDownloadPopup,
    };

    return (
        <WaterBalanceDataContext.Provider value={value}>
            {children}
        </WaterBalanceDataContext.Provider>
    );
};

export { WaterBalanceDataContext, WaterBalanceDataProvider };
