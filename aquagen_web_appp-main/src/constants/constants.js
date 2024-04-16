import { Capacitor } from '@capacitor/core';

let constants = {};

constants.env = {
    prod: 'prod',
    dev: 'dev',
    local: 'local',
    ngrok: 'ngrok',
};

constants.analyticsSecret = {
    GA_TRACKING_ID: 'G-XK060PKQK9',
    MIX_PANEL_TRACKING_ID: '100fd6baeb1ab69287d35db852111358',
};

const development = process.env.NODE_ENV !== 'production';

constants.currentEnv = constants.env.prod;

constants.azureAdEnv = constants.env.prod;

constants.analyticsEnv = development;

constants.logAnalyticsEvent = false;

constants.logRequest = false;

constants.logResponse = false;

constants.logCURL = false;

constants.isMobile = Capacitor.isNativePlatform();

constants.refreshDuration = 5 * 60 * 1000;

constants.resendOtpTime = 30;

constants.microsoftSignInEnabled = false;

constants.request = {
    method: {
        OPTIONS: 'OPTIONS',
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
    },
    defaultTimeout: 20000,
    contentType: {
        JSON: 'application/json',
    },
    error: {
        BadRequest: {
            code: 400,
            message: 'Your request was invalid. Please try again.',
        },
        NotFound: {
            code: 404,
            message: 'Requested object not found.',
        },
        Unauthorized: {
            code: 401,
            message: 'Your session has expired. Please login to continue.',
        },
        PaymentRequired: {
            code: 402,
            message:
                'Payment is required to access the resource. Please login to continue.',
        },
        API: {
            code: 500,
            message: 'Some error occured. Please contact: hello@nixbees.com',
        },
        InternalServer: {
            code: 500,
            message: 'Some error occured. Please contact: hello@nixbees.com',
        },
    },
};

constants.sidebarDisabledPages = [
    'manage_account/account_info',
    '/home/manage_account',
];

constants.demoVideoUrl = '6544ca9d30d489a0449ac63f';

constants.feedbackForm =
    'https://forms.clickup.com/7230821/f/6wnb5-16916/3J9AK90QU15768Y8CD';

constants.video = 'http://localhost:3001/video1';    

export { constants };
