function openAbout() {
   chrome.tabs.create({ url: "about.html" });
}

function forceCheck() {
    var backgroundPage = chrome.extension.getBackgroundPage();
    backgroundPage.checkMessages();
}

