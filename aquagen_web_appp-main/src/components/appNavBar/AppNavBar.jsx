import * as React from 'react';
import MobileAppNavBar from './MobileAppNavBar';
import WebAppNavBar from './WebAppNavBar';
import { useMediaQuery, useTheme } from '@mui/material';

function AppNavBar({ children }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    if (isMobile) {
        return <MobileAppNavBar>{children}</MobileAppNavBar>;
    }
    return <WebAppNavBar>{children}</WebAppNavBar>;
}

export default AppNavBar;
