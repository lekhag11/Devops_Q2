import { assets } from 'src/assets/assets';

function showNotification(title, body, onClick, icon) {
    if (isIOS()) {
        return;
    }
    if (Notification.permission === 'granted') {
        showDesktopNotification(title, body, onClick, icon);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                showDesktopNotification(title, body, onClick, icon);
            }
        });
    }
}

function showDesktopNotification(title, body, onClick, icon) {
    const myNotification = new Notification(title, {
        icon: icon || assets.images.notificationLogo,
        body: body,
    });

    myNotification.onclick = (e) => {
        myNotification.close();
        if (onClick) {
            onClick(e);
        }
    };
}

function isIOS() {
    const browserInfo = navigator.userAgent.toLowerCase();

    if (browserInfo.match('iphone') || browserInfo.match('ipad')) {
        return true;
    } else if (
        [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod',
        ].includes(navigator.platform)
    ) {
        return true;
    }
    return false;
}

function checkAndGetNotificationPermission() {
    if (isIOS()) {
        return;
    }
    if (Notification.permission !== 'denied') {
        Notification.requestPermission();
    }
}

const NotificationService = {
    showNotification: showNotification,
    checkAndGetNotificationPermission: checkAndGetNotificationPermission,
};

export { NotificationService };
