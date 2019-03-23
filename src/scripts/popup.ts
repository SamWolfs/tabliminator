var setMaxTabsButton = document.getElementById('setMaxTabs');
var maxTabsInput: HTMLInputElement = <HTMLInputElement>document.getElementById('maxTabs');

setMaxTabsButton.onclick = function () {
    chrome.storage.sync.set({ 'maxTabs': maxTabsInput.valueAsNumber }, () => {
        console.log('Max tabs set.');
    });
};