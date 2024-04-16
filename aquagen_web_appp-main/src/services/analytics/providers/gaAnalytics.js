import ReactGA from 'react-ga4';
import { constants } from 'src/constants/constants';
import { AnalyticEventsCategory } from 'src/enums/analyticsEnum';

const GAAnalytics = {};

GAAnalytics.partnerSetup = (userData) => {
    ReactGA.initialize(constants.analyticsSecret.GA_TRACKING_ID, {
        gaOptions: {
            debug_mode: true,
        },
    });
};

GAAnalytics.init = (userData) => {
    ReactGA.set(userData);
};

GAAnalytics.sendEvent = (event, props, pageView) => {
    let eventCategory = AnalyticEventsCategory[event];
    if (pageView) {
        ReactGA.send({
            hitType: 'pageview',
            page: window.location.pathname,
            title: eventCategory,
        });
        return;
    }

    const gaData = {
        category: eventCategory,
        action: event,
        ...props,
    };

    ReactGA.event(event, gaData);
};

export { GAAnalytics };
