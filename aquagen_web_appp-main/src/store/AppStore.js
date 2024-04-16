import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import { createContext, useEffect, useState } from 'react';
import FullScreenLoader from 'src/components/loader/FullScreenLoader';
import { validateLogin } from 'src/controllers/splash/splashController';
import { NotificationService } from 'src/utils/notificationUtil';

const AppStoreContext = createContext({});

var oldState = undefined;

const AppStoreContextProvider = ({ children }) => {
    const [loginData, setLoginData] = useState(undefined);

    const [isValidated, setIsValidated] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState();

    const [sideBarOpen, setSideBarOpen] = useState(false);

    const [menuIconEnabled, setMenuIconEnabled] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (isMobile && !oldState) {
            setSideBarOpen(false);
        } else {
            if (!isMobile && oldState) {
                setSideBarOpen(true);
            }
        }

        oldState = isMobile;
    }, [isMobile]);

    useEffect(() => {
        if (
            window.location.pathname !== '/' &&
            window.location.pathname !== '/login' &&
            window.location.pathname !== '/splash'
        ) {
            validateLogin(
                isValidated,
                setIsValidated,
                setLoginData,
                setSelectedCategory,
                undefined,
                false
            );
        } else {
            setIsValidated(true);
        }

        NotificationService.checkAndGetNotificationPermission();
        // eslint-disable-next-line
    }, []);

    return (
        <AppStoreContext.Provider
            value={{
                loginData,
                setLoginData,
                selectedCategory,
                setSelectedCategory,
                sideBarOpen,
                setSideBarOpen,
                menuIconEnabled,
                setMenuIconEnabled,
            }}
        >
            {isValidated ? children : <FullScreenLoader />}
        </AppStoreContext.Provider>
    );
};

export { AppStoreContext, AppStoreContextProvider };
