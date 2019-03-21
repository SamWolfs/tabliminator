// chrome.runtime.onInstalled.addListener(function() {

// });

let tabray = new Set();
let maxTabs = 1;

chrome.storage.onChanged.addListener((changes) => {
    if (changes.maxTabs) {
        maxTabs = changes.maxTabs;
    }
});

chrome.runtime.onStartup.addListener(() => {
    chrome.tabs.query({}, tabs => {
        tabs.forEach(tab => {
            tabray = [...tabray, {id: tab.id, timestamp: new Date()}];
        });
    });
    chrome.storage.sync.get(['maxTabs'], (result) => {
        if (result) {
            maxTabs = result.maxTabs;
        }
    })
});

chrome.tabs.onCreated.addListener((tab) => {
    tabray.add()
    chrome.tabs.query({}, tabs => {
        if (tabs.length > maxTabs) {
            chrome.tabs.remove(tabs[tabs.length - 1].id);
        }
    });
    console.log('after create: ', tabray);
});

chrome.tabs.onRemoved.addListener((tabId) => {
    tabray.splice(tabray.indexOf(tabId), 1);
    console.log('after remove: ', tabray);
});