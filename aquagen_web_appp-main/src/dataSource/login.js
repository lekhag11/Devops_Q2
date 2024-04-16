import { loginRequest } from 'src/authConfig';
import { LoginTypes } from 'src/controllers/splash/splashController';
import { apiClient } from 'src/services/api/apiClient';
import { Urls } from 'src/services/api/urls';

async function microsoftLogin(instance, accounts) {
    let creds = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
    });

    if (creds) {
        return login({
            Authorization: creds.idToken,
            tid: creds.tenantId,
            LoginType: LoginTypes.microsoft,
        });
    }
}

async function defaultLogin(username, password) {
    return login({
        username: username,
        password: password,
        LoginType: LoginTypes.default,
    });
}

async function otpLogin(phNumber, otp, timestamp) {
    return login({
        username: phNumber,
        password: otp,
        otpTimestamp: timestamp,
        LoginType: LoginTypes.otp,
    });
}

async function login(headers) {
    try {
        let loginResponse = await apiClient.get(Urls.login, {}, headers);
        if (loginResponse) {
            return loginResponse.data;
        }
    } catch (e) {}
}

async function otpPhnCheck(phNumber) {
    try {
        let response = await apiClient.post(
            Urls.otpPhnCheck,
            {},
            {},
            {
                phNumber: phNumber,
            }
        );
        if (response) {
            return response.data;
        }
    } catch (e) {}
}

async function refreshToken(token) {
    try {
        let loginResponse = await apiClient.get(
            Urls.refreshToken,
            {},
            {
                Authorization: token,
            }
        );
        if (loginResponse) {
            return loginResponse.data;
        }
    } catch (e) {}
}

const LoginDataSource = {
    microsoftLogin: microsoftLogin,
    defaultLogin: defaultLogin,
    otpLogin: otpLogin,
    otpPhnCheck: otpPhnCheck,
    refreshToken: refreshToken,
};

export { LoginDataSource };
