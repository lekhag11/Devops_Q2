import { AnalyticEvents } from 'src/enums/analyticsEnum';
import {
    NavigationOptions,
    NavigationRoutes,
} from 'src/enums/navigationOptions';
import { AnalyticsService } from 'src/services/analytics/analyticsService';
import { LocalDBInstance, LocalDBKeys } from 'src/services/localdb/localdb';
import { WebSocketService } from 'src/services/websocket/websocket';

function handleNavigationOnResponse(
    response,
    setLoginData,
    setSelectedCategory,
    navigate,
    redirectOnSuccess,
    decodedAccessToken
) {
    if (response) {
        AnalyticsService.init();

        AnalyticsService.sendEvent(AnalyticEvents.DEFAULT_LOGIN_SUCCESS, {
            loginType: LocalDBInstance.getItem(LocalDBKeys.loginType),
        });

        setLoginData(response);
        LocalDBInstance.setItem(
            LocalDBKeys.loginResponse,
            JSON.stringify(response)
        );
        WebSocketService.initWebsocket(response.webSocketUrl);
        if (redirectOnSuccess) {
            // For normal login flow
            setSelectedCategory(response.services[0]);
            navigate(
                `/home/${response.services[0].standardCategoryId.toLowerCase()}/${
                    response.services[0].categoryId
                }`
            );
        } else {
            // For opening direct page flow
            // To validate if the subpath doesn't exist then redirect to home screen
            let redirectToSplash = true;
            for (let service in response.services) {
                if (
                    window.location.pathname.includes(
                        `${response.services[
                            service
                        ].standardCategoryId.toLowerCase()}/${
                            response.services[service].categoryId
                        }`
                    )
                ) {
                    setSelectedCategory(response.services[service]);
                    redirectToSplash = false;
                    break;
                }
            }
            if (
                window.location.pathname.includes(
                    NavigationRoutes[NavigationOptions.waterBalance.categoryId]
                )
            ) {
                setSelectedCategory(NavigationOptions.waterBalance);
                redirectToSplash = false;
            }

            if (window.location.pathname.includes('manage_account')) {
                redirectToSplash = false;

                if (
                    window.location.pathname.includes('account_settings') &&
                    !decodedAccessToken.fresh
                ) {
                    navigate('/home/manage_account');
                }
            }

            if (redirectToSplash) {
                window.location.pathname = '/';
            }
        }
        return;
    }

    navigate('/login');
}
export { handleNavigationOnResponse };
