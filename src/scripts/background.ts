import Settings from './settings';
import TabManager from './tabmanager';

chrome.storage.onChanged.addListener((changes) => {
    if (changes.maxTabs) {
        Settings.maxTabs = changes.maxTabs.newValue;
    }
});

chrome.runtime.onStartup.addListener(() => {
    chrome.tabs.query({}, tabs => {
        TabManager.initTabs(tabs);
    });
    chrome.storage.sync.get(['maxTabs'], (result) => {
        if (result) {
            Settings.maxTabs = result.maxTabs;
        }
    })
});

chrome.tabs.onActivated.addListener((activeTab) => {
    TabManager.updateLastActivated(activeTab.tabId);
});

chrome.tabs.onCreated.addListener((tab) => {
    TabManager.addTab(tab.id);
    TabManager.checkForRemoval();
});

chrome.tabs.onRemoved.addListener((tabId) => {
    TabManager.removeTab(tabId);
});