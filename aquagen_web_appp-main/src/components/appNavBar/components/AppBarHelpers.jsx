const drawerWidth = (open, alwaysOpened) => {
    return open ? 240 : alwaysOpened ? 60 : 0;
};

const getMainPageWidth = (open) => {
    return {
        xs: `calc(100%)`,
        md: `calc(100% - ${drawerWidth(open, true)}px)`,
    };
};

const getSubPageWidth = (open) => {
    return {
        xs: drawerWidth(open, false),
        md: drawerWidth(open, true),
    };
};

export { drawerWidth, getMainPageWidth, getSubPageWidth };
