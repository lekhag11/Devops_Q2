import { Box, Container } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import SubPageWrapper from 'src/components/helper/SubPageWrapper';
import { AppStoreContext } from 'src/store/AppStore';
import {
    WaterBalanceDataContext,
    WaterBalanceDataProvider,
} from 'src/store/WaterBalanceStore';
import FixedBar from 'src/components/fixedBar/FIxedBar';
import WaterBalanceHeading from 'src/pages/home/subPages/waterBalance/components/WaterBalanceHeading';
import BuildWaterBalanceGraph from 'src/pages/home/subPages/waterBalance/components/BuildWaterBalanceGraph';
import { NavigationOptions } from 'src/enums/navigationOptions';
import ContactForDiagram from 'src/pages/home/subPages/waterBalance/components/ContactForDiagram';
import If from 'src/components/logical/If';
import { AnalyticsService } from 'src/services/analytics/analyticsService';
import { AnalyticEvents } from 'src/enums/analyticsEnum';
import DownloadPopup from 'src/pages/home/subPages/waterBalance/components/DownloadPopup';

const WaterBalance = () => {
    const appStore = useContext(AppStoreContext);

    useEffect(() => {
        appStore.setMenuIconEnabled(false);
        appStore.setSelectedCategory(NavigationOptions.waterBalance);
        AnalyticsService.sendEvent(AnalyticEvents.PAGE_VIEW, {}, true);
        // eslint-disable-next-line
    }, []);

    return (
        <SubPageWrapper>
            <Box sx={{ width: '100%' }}>
                <WaterBalanceDataProvider>
                    <WaterBalanceDataContext.Consumer value>
                        {(waterBalanceStore) => (
                            <FixedBar
                                bar={
                                    <WaterBalanceHeading
                                        siUnit={
                                            waterBalanceStore.balanceData
                                                ?.siUnit
                                        }
                                    />
                                }
                            >
                                <Box
                                    className={'download-image'}
                                    paddingTop={2}
                                >
                                    <Container
                                        sx={{
                                            height: '70vh',
                                            overflow: 'hidden',
                                            position: 'relative',
                                        }}
                                    >
                                        <If
                                            condition={
                                                !waterBalanceStore.balanceData
                                                    .data &&
                                                !waterBalanceStore.isLoading
                                            }
                                        >
                                            <ContactForDiagram />
                                        </If>
                                        <BuildWaterBalanceGraph />
                                    </Container>
                                    <If
                                        condition={!waterBalanceStore.isLoading}
                                    >
                                        <DownloadPopup />
                                    </If>
                                </Box>
                            </FixedBar>
                        )}
                    </WaterBalanceDataContext.Consumer>
                </WaterBalanceDataProvider>
            </Box>
        </SubPageWrapper>
    );
};

export default WaterBalance;
