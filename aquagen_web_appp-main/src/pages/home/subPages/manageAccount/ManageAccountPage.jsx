import React, { useContext, useEffect } from 'react';
import { AccountStoreContextProvider } from 'src/store/AccountStore';
import { Outlet } from 'react-router-dom';
import { AppStoreContext } from 'src/store/AppStore';

function ManageAccountPage() {
    const appStore = useContext(AppStoreContext);

    useEffect(() => {
        appStore.setMenuIconEnabled(false);
        // eslint-disable-next-line
    }, []);

    return (
        <AccountStoreContextProvider>
            <Outlet />
        </AccountStoreContextProvider>
    );
}

export default ManageAccountPage;
