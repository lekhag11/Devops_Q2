import { LocalDBInstance, LocalDBKeys } from 'src/services/localdb/localdb';
import {
    AllAnalyticsServiceProviders,
    AnalyticsServiceProviders,
} from 'src/enums/analyticsEnum';
import { constants } from 'src/constants/constants';
import { GAAnalytics } from './providers/gaAnalytics';
import { FirebaseAnalytics } from './providers/firebaseAnalytics';
import { MixPanelAnalytics } from './providers/mixPanelAnalytics';

const AnalyticsService = {};

const getUserData = () => {
    const loginData = LocalDBInstance.getItem(LocalDBKeys.loginResponse);
    if (loginData) {
        const userData = JSON.parse(
            LocalDBInstance.getItem(LocalDBKeys.loginResponse)
        );
        return {
            userId: userData.userId,
            userName: userData.username,
            industryId: userData.industryId,
            industryName: userData.industryName,
            type: userData.type,
            email: userData.email,
            sector: userData.sector,
            subSector: userData.subSector,
        };
    }
    return {
        userId: 'GUEST_USER',
        industryId: 'GUEST_USER',
    };
};

AnalyticsService.partnerSetup = () => {
    if (constants.analyticsEnv) {
        return;
    }
    GAAnalytics.partnerSetup();
    MixPanelAnalytics.partnerSetup();
};

AnalyticsService.init = () => {
    if (constants.analyticsEnv) return;

    const userData = getUserData();

    GAAnalytics.init(userData);
    FirebaseAnalytics.init(userData);
    MixPanelAnalytics.init(userData);
};

AnalyticsService.sendEvent = (
    event,
    props = {},
    pageView = false,
    serviceProviders = AllAnalyticsServiceProviders
) => {
    if (constants.logAnalyticsEvent) {
        logEvent(event, props, pageView);
    }

    if (constants.analyticsEnv) return;

    for (let index in serviceProviders) {
        switch (serviceProviders[index]) {
            case AnalyticsServiceProviders.GA:
                GAAnalytics.sendEvent(event, props, pageView);
                break;
            case AnalyticsServiceProviders.FIREBASE:
                FirebaseAnalytics.sendEvent(event, props, pageView);
                break;
            case AnalyticsServiceProviders.MIX_PANEL:
                MixPanelAnalytics.sendEvent(event, props, pageView);
                break;
            default:
                break;
        }
    }
};

const logEvent = (event, props, pageView) => {
    const eventDetails = {
        EVENT: event,
        DATA: props,
        PAGE_VIEW: pageView,
    };

    console.log(eventDetails);
};

export { AnalyticsService };
