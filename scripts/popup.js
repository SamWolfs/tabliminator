var setMaxTabsButton = document.getElementById('setMaxTabs');
var maxTabsInput = document.getElementById('maxTabs');

setMaxTabsButton.onclick = function () {
    chrome.storage.sync.set({ 'maxTabs': maxTabsInput.value }, () => {
        console.log('Max tabs set.');
    });
};