import { RouterProvider } from 'react-router-dom';
import { appRouter } from './routes/routes';
import { ThemeProvider } from '@mui/material';
import CustomTheme from './themes/CustomTheme';
import { AppStoreContextProvider } from './store/AppStore';
import { AnalyticsService } from 'src/services/analytics/analyticsService';

/*
  Add Screen Variant Store
*/

AnalyticsService.partnerSetup();

function App() {
    return (
        <ThemeProvider theme={CustomTheme}>
            <AppStoreContextProvider>
                <RouterProvider router={appRouter} />
            </AppStoreContextProvider>
        </ThemeProvider>
    );
}

export default App;
