import Settings from './settings';

var setMaxTabsButton = document.getElementById('setMaxTabs');
var maxTabsInput: HTMLInputElement = <HTMLInputElement>document.getElementById('maxTabs');
var maxAllowedTabs = document.getElementById('maxAllowedTabs');
var tabsEliminated = document.getElementById('tabsEliminated');

window.onpageshow = () => {
    chrome.storage.sync.get(['maxTabs', 'tabsEliminated'], (result) => {
        if (result.maxTabs) {
            maxAllowedTabs.innerHTML = result.maxTabs;
        } else {
            maxAllowedTabs.innerHTML = Settings.maxTabs.toString();
        }
        if (result.tabsEliminated) {
            tabsEliminated.innerHTML = result.tabsEliminated;
        } else {
            tabsEliminated.innerHTML = '0';
        }
    });
};

setMaxTabsButton.onclick = function () {
    let maxTabs = maxTabsInput.valueAsNumber;
    if (maxTabs) {
        chrome.storage.sync.set({ maxTabs: maxTabs }, () => {
            maxAllowedTabs.innerHTML = maxTabs.toString();
        });
    }
};