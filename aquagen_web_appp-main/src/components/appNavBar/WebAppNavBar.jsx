import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import { assets } from 'src/assets/assets';
import AppBarRightMenu from './components/AppBarRightMenu';
import { AppBar } from '@mui/material';
import AppBarLeftMenu from './components/AppBarLeftMenu';

function WebAppNavBar({ children }) {
    const [profileMenu, setProfileMenu] = React.useState(undefined);

    const handleProfileMenuClick = (event) => {
        setProfileMenu(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileMenu(undefined);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position='fixed'
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: assets.colors.primary,
                }}
            >
                <Toolbar sx={{ backgroundColor: assets.colors.primary }}>
                    <AppBarLeftMenu />
                    <Box sx={{ flexGrow: 1 }} />
                    <AppBarRightMenu
                        handleProfileMenuClose={handleProfileMenuClose}
                        handleProfileMenuClick={handleProfileMenuClick}
                        profileMenu={profileMenu}
                    />
                </Toolbar>
            </AppBar>

            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}

export default WebAppNavBar;
