import mixpanel from 'mixpanel-browser';
import { constants } from 'src/constants/constants';

const MixPanelAnalytics = {};

MixPanelAnalytics.partnerSetup = () => {
    mixpanel.init(constants.analyticsSecret.MIX_PANEL_TRACKING_ID);
};

MixPanelAnalytics.sendEvent = (event, props, pageView) => {
    props.pageView = pageView;
    props.pathName = window.location.pathname;
    mixpanel.track(event, props);
};

MixPanelAnalytics.init = (userData) => {
    mixpanel.identify(userData.userId);
    mixpanel.alias(userData.userName);
    let props = { ...userData };
    delete props.userID;
    mixpanel.people.set(userData.userId, props);
};

export { MixPanelAnalytics };
