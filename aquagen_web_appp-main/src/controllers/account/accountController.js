import { AccountDataSource } from 'src/dataSource/account';
import { LoginController } from '../login/loginController';

async function getAccountData() {
    return await AccountDataSource.getAccountData();
}

async function accountSettingsUpdate(payload, appStore) {
    let response = await AccountDataSource.accountSettingsUpdate(payload);
    if (response) {
        LoginController.refreshToken(
            appStore?.loginData.refreshToken,
            appStore?.setLoginData
        );
    }
    return response;
}

async function handleLogoChange(event) {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const response = await AccountDataSource.accountSettingsLogoUpdate(
            formData
        );
        return response;
    }
}

const AccountController = {
    getAccountData: getAccountData,
    handleLogoChange: handleLogoChange,
    accountSettingsUpdate: accountSettingsUpdate,
};

export { AccountController };
