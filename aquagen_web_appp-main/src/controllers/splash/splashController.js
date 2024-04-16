import { jwtDecode } from 'jwt-decode';
import { LocalDBInstance, LocalDBKeys } from 'src/services/localdb/localdb';
import { handleNavigationOnResponse } from 'src/utils/navigationHelper';
import { LoginTypes } from 'src/enums/loginType';
import { AnalyticsService } from 'src/services/analytics/analyticsService';
import { LoginController } from '../login/loginController';

function clearAndNavigateToLogin() {
    LocalDBInstance.removeItem(LocalDBKeys.loginResponse);
    LocalDBInstance.removeItem(LocalDBKeys.loginType);
    window.location.pathname = '/';
}

async function validateLogin(
    isValidated,
    setIsValidated,
    setLoginData,
    setSelectedCategory,
    navigate,
    redirectOnSuccess = true
) {
    if (isValidated) {
        return;
    }
    let loginResponse = JSON.parse(
        LocalDBInstance.getItem(LocalDBKeys.loginResponse)
    );
    if (loginResponse) {
        const decodedAccessToken = jwtDecode(loginResponse.token);
        const decodedRefreshToken = jwtDecode(loginResponse.refreshToken);
        let currentTimeInMS = parseInt((new Date().getTime() / 1000).toFixed());
        if (currentTimeInMS > decodedAccessToken.exp) {
            if (currentTimeInMS > decodedRefreshToken.exp) {
                clearAndNavigateToLogin();
                return;
            } else {
                try {
                    const response = await LoginController.refreshToken(
                        loginResponse.refreshToken,
                        setLoginData
                    );
                    if (response) {
                        loginResponse = response;
                    } else {
                        clearAndNavigateToLogin();
                        return;
                    }
                } catch (error) {
                    clearAndNavigateToLogin();
                    return;
                }
            }
        }
        handleNavigationOnResponse(
            loginResponse,
            setLoginData,
            setSelectedCategory,
            navigate,
            redirectOnSuccess,
            decodedAccessToken
        );
        setIsValidated(true);
    } else if (navigate) {
        navigate('/login');
    } else {
        window.location.pathname = '/';
    }
    AnalyticsService.init();
}

export { LoginTypes, validateLogin };
