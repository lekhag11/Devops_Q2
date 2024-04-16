import { browserName, browserVersion, deviceType } from 'react-device-detect';
import axios from 'axios';
import { constants } from 'src/constants/constants';
import { common } from './common';
import { Urls } from './urls';
import { LocalDBInstance, LocalDBKeys } from '../localdb/localdb';

let axiosClient = axios.create({
    timeout: constants.request.defaultTimeout,
    headers: { 'content-type': constants.request.contentType.JSON },
    baseURL: Urls.baseUrl,
});

if (constants.logCURL) {
    common.showAxiosCurl(axiosClient);
}

function getOS() {
    const userAgent = window.navigator.userAgent,
        platform =
            window.navigator?.userAgentData?.platform ||
            window.navigator.platform,
        macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (/Linux/.test(platform)) {
        os = 'Linux';
    }

    return os;
}

axiosClient.interceptors.request.use(function (config) {
    config.metadata = { startTime: new Date() };
    let baseConfig = config.baseConfig;
    let customConfig = config.customConfig;
    let headers = {};
    let loginResponse = JSON.parse(
        LocalDBInstance.getItem(LocalDBKeys.loginResponse)
    );
    if (config.url === Urls.refreshToken) {
        headers['Authorization'] = loginResponse?.refreshToken;
    } else {
        headers['Authorization'] = loginResponse?.token;
    }
    if (config.isMultipart) {
        headers['Content-Type'] =
            constants.request.contentType.MULTIPART_FORM_DATA;
    } else {
        headers['Content-Type'] = constants.request.contentType.JSON;
    }
    headers['browserName'] = browserName;
    headers['browserVersion'] = browserVersion;
    headers['deviceType'] = deviceType;
    headers['operationSystem'] = getOS();
    headers['Access-Control-Allow-Origin'] = true;

    headers = Object.assign(config.headers, headers);
    baseConfig.headers = Object.assign(headers, baseConfig.headers);
    customConfig = Object.assign(baseConfig, customConfig || {});
    config = Object.assign(config, customConfig);

    _logRequest(config);
    return config;
});

axiosClient.interceptors.response.use(
    function (res) {
        res.config.metadata.endTime = new Date();
        _logResponse(res);
        return res;
    },
    async function (err) {
        if (err?.response?.status === 420) {
            window.location.pathname = '/';
        } else if (err.response?.data) {
            throw err.response.data;
        } else if (err.code) {
            let error = {
                code: err.code,
            };
            if (err.reason) {
                error.message = err.reason;
            }
            throw error;
        } else {
            throw err;
        }
    }
);

async function get(url, params, headers, customConfig) {
    try {
        let baseConfig = { headers: headers, params: params };
        const response = await axiosClient.get(url, {
            baseConfig: baseConfig,
            customConfig: customConfig,
        });
        return response;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function post(url, body, params, headers, customConfig) {
    try {
        let baseConfig = { headers: headers, params: params };
        const response = await axiosClient.post(url, body, {
            baseConfig: baseConfig,
            customConfig: customConfig,
        });
        return response;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function put(url, body, params, headers, customConfig) {
    try {
        let baseConfig = { headers: headers, params: params };
        const response = await axiosClient.put(url, body, {
            baseConfig: baseConfig,
            customConfig: customConfig,
        });
        return response;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function patch(url, body, params, headers, customConfig) {
    try {
        let baseConfig = { headers: headers, params: params };
        const response = await axiosClient.patch(url, body, {
            baseConfig: baseConfig,
            customConfig: customConfig,
        });
        return response;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function del(url, params, headers, customConfig) {
    try {
        let baseConfig = { headers: headers, params: params };
        const response = await axiosClient.delete(url, {
            baseConfig: baseConfig,
            customConfig: customConfig,
        });
        return response;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function postFile(url, file, fieldName, params, headers, customConfig) {
    try {
        const formData = new FormData();
        formData.append(fieldName, file);
        let baseConfig = { headers: headers, params: params };
        const response = await axiosClient.post(url, formData, {
            baseConfig: baseConfig,
            customConfig: customConfig,
            isMultipart: true,
        });
        return response;
    } catch (e) {
        console.error('Error in postFile API call:', e);
        throw e;
    }
}

function _logRequest(config) {
    if (constants.logRequest) {
        let requestId = config.headers['x-request-id'];
        common.prettyConsole(`Request: `.bold.brightBlue, requestId);
        common.prettyConsole(
            `${requestId} - URL: `.bold.brightBlue,
            config.method.toUpperCase() + ' ' + config.url
        );
        common.prettyConsole(
            `${requestId} - Headers: `.bold.brightBlue,
            config.headers
        );
        common.prettyConsole(
            `${requestId} - Params: `.bold.brightBlue,
            config.params
        );
        common.prettyConsole(
            `${requestId} - Data: `.bold.brightBlue,
            config.data
        );
        console.log(`====================`.bold.brightBlue);
    }
}

function _logResponse(res) {
    if (constants.logResponse) {
        let requestId = res.config.headers['x-request-id'];
        common.prettyConsole(`Response: `.bold.brightMagenta, requestId);
        common.prettyConsole(
            `${requestId} - Status: `.bold.brightMagenta,
            res.status
        );

        try {
            common.prettyConsole(
                `${requestId} - Data: `.bold.brightMagenta,
                res.data
            );
        } catch (e) {
            console.log(requestId, `Data: Not JSON`.bold.red);
        }

        common.prettyConsole(
            `${requestId} - Time: `.bold.brightMagenta,
            res.config.metadata.endTime - res.config.metadata.startTime
        );
        console.log(`====================`.bold.brightMagenta);
    }
}

let apiClient = {};
apiClient.get = get;
apiClient.post = post;
apiClient.put = put;
apiClient.patch = patch;
apiClient.del = del;
apiClient.postFile = postFile;

export { apiClient };
