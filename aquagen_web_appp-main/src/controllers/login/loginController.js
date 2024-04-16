import { LoginDataSource } from 'src/dataSource/login';
import { LocalDBInstance, LocalDBKeys } from 'src/services/localdb/localdb';

async function microsoftLogin(instance, accounts, navigate) {
    let response = await LoginDataSource.microsoftLogin(instance, accounts);
    if (response) {
        LocalDBInstance.setItem(
            LocalDBKeys.loginResponse,
            JSON.stringify(response)
        );
    }
    navigate('/');
}

async function defaultLogin(username, password) {
    return await LoginDataSource.defaultLogin(username, password);
}

async function otpLogin(phNumber, otp, timestamp) {
    return await LoginDataSource.otpLogin(phNumber, otp, timestamp);
}

async function otpPhnCheck(phNumber) {
    return await LoginDataSource.otpPhnCheck(phNumber);
}

async function refreshToken(refreshToken, setLoginData) {
    let response = await LoginDataSource.refreshToken(refreshToken);
    LocalDBInstance.setItem(
        LocalDBKeys.loginResponse,
        JSON.stringify(response)
    );
    setLoginData(response);
    return response;
}

const LoginController = {
    microsoftLogin: microsoftLogin,
    defaultLogin: defaultLogin,
    otpLogin: otpLogin,
    otpPhnCheck: otpPhnCheck,
    refreshToken: refreshToken,
};

export { LoginController };
