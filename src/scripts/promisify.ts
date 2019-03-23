const promisifiedGetTab = (id): Promise<chrome.tabs.Tab> => {
    return new Promise((resolve, reject) => {
        return chrome.tabs.get(id, resolve);
    });
}

export default promisifiedGetTab;