import { Drawer, Toolbar, useMediaQuery } from '@mui/material';

import SideBarMenus from './SideBarMenus';
import { getSubPageWidth } from './AppBarHelpers';
import { useTheme } from '@emotion/react';

function SideBarDrawer({ setOpen, open }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={open}
            onClose={() => setOpen(false)}
            sx={{
                width: getSubPageWidth(open),
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: getSubPageWidth(open),
                    boxSizing: 'border-box',
                },
            }}
        >
            <Toolbar />

            <SideBarMenus
                open={open}
                setOpen={setOpen}
            />
        </Drawer>
    );
}

export default SideBarDrawer;
