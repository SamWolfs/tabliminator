# Tabliminator - No More Browser Tab Hoarding
## What is Tabliminator?
Tabliminator is a Chrome extension that aims to help users manage their tab hoarding habits by allowing them to set a maximum tab limit.
Once this limit is reached, Tabliminator will start tabliminating (☞ ͡° ͜ʖ ͡°)☞ the least recently viewed tab whenever a new tab is opened.
## How does it work?
From the extension popup, the user can enter their tab limit which will be synced to their Google account thanks to the Chrome Storage Sync API.
whenever the limit is exceeded, the extension will close the least recently viewed tab whenever the limit is exceed. If the least recently viewed tab is pinned, the extension will close the next available non-pinned tab.
## Installation Guide
1. Clone the repository.
2. Run `npm i` to install the necessary dependencies.
3. Run `npm run build` to compile to JavaScript and build the project.
4. Navigate to the [chrome://extensions/](chrome://extensions/) Page and select *Load unpacked*.
5. Select the project's *dist* folder. The Extension will be loaded into Chrome.
