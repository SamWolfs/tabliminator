import Settings from './settings';

const TabManager = {
    openedTabs: [],
    initTabs(tabs) {
        tabs.forEach(tab => {
            this.addTab(tab.id);
        });
    },
    addTab(tabId) {
        this.openedTabs = [...this.openedTabs, { id: tabId, lastActivated: new Date() }];
        console.log(this.openedTabs);
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
        chrome.tabs.query({}, tabs => {
            if (tabs.length > Settings.maxTabs) {
                let snapshot = Object.assign([], this.openedTabs);
                snapshot.sort((a, b) => b - a);
                console.log(snapshot);
                chrome.tabs.remove([snapshot[0].id]);
            }
        });
    }
}

export default TabManager;