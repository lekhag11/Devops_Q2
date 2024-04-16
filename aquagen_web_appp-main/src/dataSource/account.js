import { apiClient } from 'src/services/api/apiClient';
import { Urls } from 'src/services/api/urls';

async function getAccountData() {
    try {
        let accountDataResponse = await apiClient.get(Urls.accountDetails);
        if (accountDataResponse) {
            return accountDataResponse.data;
        }
    } catch (error) {
        console.error('Error in accountData API call:', error);
    }
}

async function accountSettingsUpdate(payload) {
    try {
        let accountSettingsUpdateResponse = await apiClient.post(
            Urls.accountSettingsUpdate,
            payload
        );
        if (accountSettingsUpdateResponse) {
            return accountSettingsUpdateResponse;
        }
    } catch (error) {
        console.error('Error in accountSettingsUpdate API call:', error);
    }
}

async function accountSettingsLogoUpdate(payload) {
    try {
        let accountSettingsLogoUpdateResponse = await apiClient.post(
            Urls.accountSettingsLogoUpdate,
            payload
        );
        if (accountSettingsLogoUpdateResponse) {
            return accountSettingsLogoUpdateResponse.data;
        }
    } catch (error) {
        console.error('Error in accountSettingsLogoUpdate API call:', error);
    }
}

const AccountDataSource = {
    getAccountData: getAccountData,
    accountSettingsUpdate: accountSettingsUpdate,
    accountSettingsLogoUpdate: accountSettingsLogoUpdate,
};

export { AccountDataSource };
