import React, { createContext, useState, useEffect } from 'react';
import { AccountController } from 'src/controllers/account/accountController';

const AccountStoreContext = createContext({});

const AccountStoreContextProvider = ({ children }) => {
    const [accountScreenData, setAccountScreenData] = useState(undefined);

    async function fetchAccountData() {
        try {
            const data = await AccountController.getAccountData();
            if (data) {
                setAccountScreenData(data);
            }
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    }

    useEffect(() => {
        fetchAccountData();
        // eslint-disable-next-line
    }, []);

    const contextValue = {
        accountScreenData,
        fetchAccountData,
    };

    return (
        <AccountStoreContext.Provider value={contextValue}>
            {children}
        </AccountStoreContext.Provider>
    );
};

export { AccountStoreContext, AccountStoreContextProvider };
