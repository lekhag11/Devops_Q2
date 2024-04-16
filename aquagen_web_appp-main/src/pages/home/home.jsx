import { Box } from '@mui/material';
import Joyride from 'react-joyride';
import { Outlet } from 'react-router-dom';
import { assets } from 'src/assets/assets';
import AppNavBar from 'src/components/appNavBar/AppNavBar';
import NewChangesDialog from 'src/dialogs/NewChangesDialog';
import {
    HomeStoreContext,
    HomeStoreContextProvider,
} from 'src/store/HomeStore';

function HomeScreen() {
    const steps = [
        {
            target: '.water-balance-header-details',
            title: 'WBD Summary',
            content:
                'This section summarizes your water source, consumption and available water stock',
            disableBeacon: true,
            placement: 'left',
        },
        {
            target: '.water-balance-select-date',
            title: 'Select a date',
            content: 'Select any date to see its water balance data',
            disableBeacon: true,
            placement: 'bottom',
        },
        {
            target: '.water-balance-control-buttons',
            title: 'WBD Info',
            content:
                'Maximise, Minimise, Fit to screen and Diagram Info for the selected date',
            disableBeacon: true,
            placement: 'left',
            locale: { last: 'CLOSE' },
        },
    ];
    return (
        <HomeStoreContextProvider>
            <Box
                sx={{
                    backgroundColor: assets.colors.background,
                    minHeight: '100vh',
                }}
            >
                <HomeStoreContext.Consumer value>
                    {(homeStore) => (
                        <Joyride
                            steps={steps}
                            run={homeStore.startTour}
                            continuous
                            hideCloseButton
                            scrollToFirstStep
                            hideBackButton
                            disableBeacon
                            callback={homeStore.handleCloseTour}
                            styles={{
                                options: {
                                    zIndex: 10000,
                                    backgroundColor: '#4F9CDA',
                                    arrowColor: '#4F9CDA',
                                    textColor: 'white',
                                    primaryColor: assets.colors.primary,
                                },
                                buttonNext: {
                                    backgroundColor: 'transparent',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '4px',
                                    fontWeight: 'bold',
                                    fontSize: 12,
                                },
                                tooltipTitle: {
                                    textAlign: 'left',
                                },
                                tooltipContent: {
                                    textAlign: 'left',
                                    paddingLeft: 0,
                                    paddingBottom: 0,
                                    paddingTop: 10,
                                    lineHeight: '1.5rem',
                                },
                                tooltip: {
                                    padding: 20,
                                    borderRadius: '8px',
                                },
                            }}
                        />
                    )}
                </HomeStoreContext.Consumer>
                <AppNavBar>
                    <Outlet />
                    <NewChangesDialog />
                </AppNavBar>
            </Box>
        </HomeStoreContextProvider>
    );
}

export default HomeScreen;
