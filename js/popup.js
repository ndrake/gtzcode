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

function popupInit() {
    var backgroundPage = chrome.extension.getBackgroundPage();
    
    if(!backgroundPage.isLoggedIn()) {
        $('#msg').html(backgroundPage.getMessage());
    }
    
    if(backgroundPage.haveMessages()) {
        $('#pmIcon').html('<img src="img/new.gif" alt="New Private Messages"/>');
    } else {
        $('#pmIcon').html('');
    }
    
    if(backgroundPage.haveOffers()) {
        $('#oIcon').html('<img src="img/new.gif" alt="New Offers"/>');
    } else {
        $('#oIcon').html('');
    }
    
}

//<a href="javascript:openAbout()">About</a>

document.addEventListener('DOMContentLoaded', function () {
//    document.querySelector('button').addEventListener('click', saveOptions);
    document.getElementById('aboutLink').addEventListener('click', openAbout);
    popupInit();
});