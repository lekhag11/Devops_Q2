import * as React from 'react';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import { assets } from 'src/assets/assets';
import AppBarRightMenu from './components/AppBarRightMenu';
import { AppBar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppStoreContext } from 'src/store/AppStore';
import If from '../logical/If';
import { ChevronLeftOutlined } from '@mui/icons-material';
import IfNot from '../logical/IfNot';
import AppBarLeftMenu from 'src/components/appNavBar/components/AppBarLeftMenu';

function MobileAppNavBar({ children }) {
    const [profileMenu, setProfileMenu] = React.useState(undefined);

    const appStore = React.useContext(AppStoreContext);

    const handleProfileMenuClick = (event) => {
        setProfileMenu(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileMenu(undefined);
    };

    return (
        <Box>
            <CssBaseline />
            <AppBar
                position='fixed'
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar sx={{ backgroundColor: assets.colors.primary }}>
                    <If condition={appStore.menuIconEnabled}>
                        <IconButton
                            onClick={() =>
                                appStore.setSideBarOpen(!appStore.sideBarOpen)
                            }
                        >
                            <If condition={appStore.sideBarOpen}>
                                <ChevronLeftOutlined
                                    sx={{ mr: 2, fill: 'white' }}
                                />
                            </If>
                            <IfNot condition={appStore.sideBarOpen}>
                                <MenuIcon sx={{ mr: 2, fill: 'white' }} />
                            </IfNot>
                        </IconButton>
                    </If>
                    <AppBarLeftMenu isMobileMenu={true} />
                    <Box sx={{ flexGrow: 1 }} />
                    <AppBarRightMenu
                        handleProfileMenuClose={handleProfileMenuClose}
                        handleProfileMenuClick={handleProfileMenuClick}
                        profileMenu={profileMenu}
                        timerEnabled={false}
                    />
                </Toolbar>
            </AppBar>

            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                }}
            >
                {/* Just to give top space for padding */}
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}

export default MobileAppNavBar;
