function openAbout() {
   chrome.tabs.create({ url: "about.html" });
}

function openOptions() {
   chrome.tabs.create({ url: "options.html" });
}

function forceCheck() {
    var backgroundPage = chrome.extension.getBackgroundPage();
    backgroundPage.checkMessages();
}

