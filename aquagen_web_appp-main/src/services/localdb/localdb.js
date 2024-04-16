class LocalDB {
    getItem(name) {
        return localStorage.getItem(name);
    }

    setItem(name, value) {
        localStorage.setItem(name, value);
    }

    removeItem(name) {
        localStorage.removeItem(name);
    }
}

const LocalDBKeys = {
    loginType: 'loginType',
    loginResponse: 'loginResponse',
    showNewFeatures: 'showNewFeatures',
};

let LocalDBInstance = new LocalDB();

export { LocalDBInstance, LocalDBKeys };
