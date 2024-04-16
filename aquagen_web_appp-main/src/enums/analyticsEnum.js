const AnalyticsServiceProviders = {
    GA: 'GA',
    FIREBASE: 'FIREBASE',
    MIX_PANEL: 'MIX_PANEL',
};

const AllAnalyticsServiceProviders = [
    AnalyticsServiceProviders.GA,
    AnalyticsServiceProviders.FIREBASE,
    AnalyticsServiceProviders.MIX_PANEL,
];

const AnalyticEventsCategory = {
    default_login: 'default_login',
    signout_user: 'sign_out',
    page_view: 'page_view',
    consumption_trend_change: 'water_consumption',
    view_consumption_details: 'water_consumption',
    date_change: 'water_consumption',
    reports_download: 'reports',
    alerts_icon_click: 'alerts',
    alerts_click: 'alerts',
    comparison_data: 'water_consumption',
};

const AnalyticEvents = {
    SIGN_OUT_USER: 'signout_user',

    DEFAULT_LOGIN_CLICK: 'default_login_click',
    DEFAULT_LOGIN_SUCCESS: 'default_login_success',
    DEFAULT_LOGIN_ERROR: 'default_login_error',

    SEND_OTP_CLICK: 'send_otp_button_click',
    SEND_OTP_ERROR: 'send_otp_error',
    OTP_LOGIN_CLICK: 'otp_login_click',
    RESEND_OTP: 'resend_otp',
    OTP_LOGIN_ERROR: 'otp_login_error',

    PAGE_VIEW: 'page_view',
    CONSUMPTION_TREND: 'consumption_trend_change',

    REPORTS_DOWNLOAD: 'reports_download',

    ALERTS_ICON_CLICK: 'alerts_icon_click',
    ALERTS_CLICK: 'alerts_click',

    MANAGE_ACCOUNT_CLICK: 'manage_account_click',
    ACCOUNT_INFO_CLICK: 'account_info_click',
    ACCOUNT_SETTINGS_CLICK: 'account_settings_click',
    ACCOUNT_SETTINGS_ICON_CHANGE: 'account_settings_icon_change',
    ACCOUNT_SETTINGS_UPDATE: 'account_settings_update',

    WATER_BALANCE_DATE_CHANGE: 'water_balance_date_change',
};

Object.freeze(AnalyticsServiceProviders, AnalyticEvents);

export {
    AnalyticsServiceProviders,
    AnalyticEvents,
    AnalyticEventsCategory,
    AllAnalyticsServiceProviders,
};
