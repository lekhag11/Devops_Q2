const NavigationOptions = {};
const NavigationRoutes = {
    ROOT: '/',
    HOME: '/home',
    WATER_BALANCE: '/home/water_balance/graph',
};

NavigationOptions.waterBalance = {
    categoryId: 'WATER_BALANCE',
    displayName: 'Water Balance',
};

NavigationOptions.waterMonitoring = {
    categoryId: 'WATER_MONITORING',
    displayName: 'Water Monitoring',
};

Object.freeze(NavigationOptions, NavigationRoutes);

export { NavigationOptions, NavigationRoutes };
