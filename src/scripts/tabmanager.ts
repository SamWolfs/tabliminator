import Settings from './settings';
import promisifiedGetTab from './promisify';

const TabManager = {
    openedTabs: [],
    initTabs(tabs) {
        tabs.forEach(tab => {
            this.addTab(tab.id);
        });
    },
    addTab(tabId) {
        this.openedTabs = [...this.openedTabs, { id: tabId, lastActivated: new Date() }];
    },
    updateLastActivated(tabId) {
        if (typeof tabId === 'number') {
            this.removeTab(tabId);
            this.openedTabs = [...this.openedTabs, { id: tabId, lastActivated: new Date() }];
        } else {
            console.error(`${tabId} is not a number`);
        }
    },
    removeTab(tabId) {
        if (typeof tabId === 'number') {
            let index = this.openedTabs.findIndex(tab => tab.id === tabId);
            if (index > -1) {
                this.openedTabs.splice(index, 1);
            }
        } else {
            console.error(`${tabId} is not a number`);
        }
    },
    checkForRemoval() {
        chrome.tabs.query({}, async tabs => {
            if (tabs.length > Settings.maxTabs) {
                let snapshot = Object.assign([], this.openedTabs);
                snapshot.sort((a, b) => a - b);
                for (let i = 0; i < snapshot.length; i++) {
                    const tab = await promisifiedGetTab(snapshot[i].id);
                    if (!tab.pinned) {
                        chrome.tabs.remove([tab.id]);
                        return;
                    }
                }
            }
        });
    },
    updateEliminated() {
        chrome.storage.sync.get(['tabsEliminated'], result => {
            if (typeof result.tabsEliminated === 'number') {
                chrome.storage.sync.set({ tabsEliminated: result.tabsEliminated + 1 })
            } else {
                chrome.storage.sync.set({ tabsEliminated: 1 })
            }
        });
    }
}

export default TabManager;