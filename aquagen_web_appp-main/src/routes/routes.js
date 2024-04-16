import { createBrowserRouter } from 'react-router-dom';
import CustomLoader from 'src/components/loader/loader';
import HomeScreen from 'src/pages/home/home';
import GroundWaterLevelPage from 'src/pages/home/subPages/groundWaterLevel/GroundWaterLevelPage';
import SourceCategoryPage from 'src/pages/home/subPages/consumption/consumption';
import EnergyPage from 'src/pages/home/subPages/energy/EnergyPage';
import StockCategoryPage from 'src/pages/home/subPages/stock/stock';
import QualityPage from 'src/pages/home/subPages/quality/QualityPage';
import LoginScreen from 'src/pages/login/login';
import SplashScreen from 'src/pages/splash/splash';
import AccountInfoPage from 'src/pages/home/subPages/manageAccount/AccountInfoPage';
import AccountSettingsPage from 'src/pages/home/subPages/manageAccount/components/AccountSettingsPage';
import AccountLandingPage from 'src/pages/home/subPages/manageAccount/AccountLandingPage';
import ManageAccountPage from 'src/pages/home/subPages/manageAccount/ManageAccountPage';
import ConsumptionDetail from 'src/pages/home/subPages/consumption/ConsumptionDetail';
import VideoPlayer from 'src/components/videoPlayer/VIdeoPlayer';
import WaterBalance from 'src/pages/home/subPages/waterBalance/WaterBalancePage';
import { Player } from 'src/components/videoPlayer/VIdeoPlayer';

const appRouter = createBrowserRouter([
    {
        index: true,
        element: <SplashScreen />,
    },
    {
        path: '/splash',
        element: <SplashScreen />,
    },
    {
        path: '/home',
        element: <HomeScreen />,
        children: [
            {
                index: true,
                element: <CustomLoader />,
            },
            {
                path: 'source_category/:categoryId',
                element: <SourceCategoryPage />,
                children: [
                    {
                        key: 'source_category_detail_page',
                        path: ':detailCategoryId/:unitId',
                        element: <ConsumptionDetail />,
                    },
                ],
            },
            {
                path: 'stock_category/:categoryId',
                element: <StockCategoryPage />,
            },
            {
                path: 'ground_water_level/:categoryId',
                element: <GroundWaterLevelPage />,
            },
            {
                path: 'quality_category/:categoryId',
                element: <QualityPage />,
            },
            {
                path: 'energy_category/:categoryId',
                element: <EnergyPage />,
                children: [
                    {
                        key: 'energy_category_detail_page',
                        path: ':detailCategoryId/:unitId',
                        element: <ConsumptionDetail />,
                    },
                ],
            },
            {
                path: 'manage_account',
                element: <ManageAccountPage />,
                children: [
                    {
                        index: true,
                        element: <AccountLandingPage />,
                    },
                    {
                        path: 'account_info',
                        element: <AccountInfoPage />,
                    },
                    {
                        path: 'account_settings',
                        element: <AccountSettingsPage />,
                    },
                ],
            },
            {
                path: 'water_balance/graph',
                element: <WaterBalance />,
            },
        ],
    },

    {
        path: '/login',
        element: <LoginScreen />,
    },
    {
        path: '/videos',
        element: <VideoPlayer />,
        
    },
]);

export { appRouter };
