import { NotificationService } from 'src/utils/notificationUtil';

let initialized = false;
let websocket;
let initUrl = '';

function initWebsocket(url) {
    if (initialized) {
        if (initUrl === url) {
            return;
        }
    }
    if (!url) {
        return;
    }

    initialized = true;
    initUrl = url;
    if (websocket) {
        websocket.close();
    }
    websocket = new WebSocket(url);

    websocket.onopen = () => {
        // Connected
    };

    websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.title && data.body) {
            NotificationService.showNotification(
                data.title,
                data.body,
                (e) => {
                    // TODO add notification click redirection
                },
                data.icon
            );
        }
    };
}

const WebSocketService = {
    initWebsocket: initWebsocket,
};

export { WebSocketService };
