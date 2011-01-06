//
// TODO:
// o Add "Go to GTZ" link on popup page
// o Subscriber check
// o Add link to subscribe page on GTZ


var globalTest = 23;
var checkUrl = 'http://gametz.com/?A=Data';
//var checkUrl = 'http://localhost:8080/data3';
var checkInterval = null;

var message;
var loggedIn;

function init() {
    
    loadSettings();

    setupContextMenu();
    
    checkMessages();
}


function checkMessages() {

    console.log("in checkMessages");
    if(localStorage["gtz_check_messages"] != "true") {
        console.log("message checks are disabled");
        clearTimer();
        return;
    }

    // check settings
    
    $.ajax({
        url: checkUrl,
        dataType:"json",
        success: function(data) {
            console.log(data);
            console.log("checking! " + data);
            console.log("user: " + data.user);
            console.log("pms: " + data.PMs);
            console.log("Offers: " + data.Offers);
            console.log("sub: " + data.sub);

            var badgeText = '';
            var notificationText = '';
            
            
            if(data.user = 'guest') {
                // not logged in
                console.log("not logged in");
                message = "<img src='img/icon_alert.gif'/> You are not logged in to GameTZ.  Unable to check for new PMs or offers.";
                loggedIn = false;
                chrome.browserAction.setBadgeText({text:'*'});                
                return;
            }
            
            if(data.PMs > 0) { // this is really only 0 or 1
                badgeText += 'PM';
                //chrome.browserAction.setBadgeText({text:''+data.PMs});
                notificationText += 'You have new Private Messages. ';
            }
            
            if(data.Offers > 0) {
                if(data.PMs > 0)
                    badgeText += '/';
                badgeText += data.Offers;
                notificationText += 'You have ' + data.Offers + ' new offers';
            }
            
            chrome.browserAction.setBadgeText({text:badgeText});
            
            if(localStorage["gtz_show_notifications"] == "true" &&
               notificationText != '') {
                // Create a simple text notification:
                var notification = webkitNotifications.createNotification(
                    'img/gtzcode_96.png', 
                    'gtzcode', 
                    notificationText
                );
                notification.show();
            }
        }
    });
    
    
}

function clearTimer() {
    console.log("Stopping interval...");
    clearInterval(checkInterval);
    checkInterval = null;
}

function isLoggedIn() {
    return loggedIn;
}

function getMessage() {
    return message;
}

function loadSettings() {
    console.log('in loadSettings');
    
    if (localStorage["gtz_show_notifications"] == null ||
        localStorage["gtz_show_notifications"] == "") 
    {
        localStorage["gtz_show_notifications"] = "true";
    }
    
    if (localStorage["gtz_check_messages"] == null ||
        localStorage["gtz_check_messages"] == "") 
    {
        localStorage["gtz_check_messages"] = "true";
    }
    
    if (localStorage["gtz_version"] == null ||
        localStorage["gtz_version"] != "0.6") 
    {
        localStorage["gtz_version"] = "0.6";
        // New version installed, open about.html in new tab
        chrome.tabs.create({ url: "about.html" });
    }
    
    
    if(localStorage["gtz_check_messages"] == "true") {
        console.log("starting msg check interval");
        if(checkInterval == null) {
            console.log("no checkInterval, starting one");
            //checkMessages();
            checkInterval = setInterval("checkMessages()", 1000*60*10); // check every 10 minutes
        } else {
            console.log('checkInterval is already scheduled, not doing anything');
        }
    } else {
        console.log("msg check option is off");
    }
    
    
}
// A generic onclick callback function.
function gtzCodeInsert(i, el) {
    chrome.tabs.getSelected(null, function(tab) {
        //console.log('selected tab: ' + tab);
        //console.log('item: ' + gtzcItems[i.menuItemId].name);
        chrome.tabs.sendRequest(tab.id, {"item": gtzcItems[i.menuItemId]}, function(response) {
        });
    });  
    
  //console.log("item " + info.menuItemId + " was clicked");
  //console.log("info: " + JSON.stringify(info));
  //console.log("tab: " + JSON.stringify(tab));
}

//  "documentUrlPatterns" : ["*://mail.google.com/"]
// "contexts" = "editable"
//var mainId = chrome.contextMenus.create();



// Maps menuItemId to the items array above
// Kind of a hack because I don't know a better way to get the item data in gtzCodeInsert()        
var gtzcItems = {};                

function setupContextMenu() {
    var extraMenuId = chrome.contextMenus.create({"title":"eXtra", "contexts":['editable'], "documentUrlPatterns":["*://*.gametz.com/*"]});
    var emoticonMenuId = chrome.contextMenus.create({"title":"Emoticons", "contexts":['editable'], "documentUrlPatterns":["*://*.gametz.com/*"]});
    var smileyMenuId = chrome.contextMenus.create({"title":"Smileys", "contexts":['editable'], "parentId":emoticonMenuId, "documentUrlPatterns":["*://*.gametz.com/*"]});
    var consoleMenuId = chrome.contextMenus.create({"title":"Console", "contexts":['editable'], "parentId":emoticonMenuId, "documentUrlPatterns":["*://*.gametz.com/*"]});

    var gtzMenuId = chrome.contextMenus.create({"title":"GTZ", "contexts":['editable'], "documentUrlPatterns":["*://*.gametz.com/*"]});


    // eXtras (i.e. bbcode)
    for (var i = 0; i < extraItems.length; i++) {
        var item = extraItems[i];
        var title = item.name;
        var id = chrome.contextMenus.create({"title": title, "contexts":['editable'],
                                            "onclick": gtzCodeInsert,
                                            "parentId": extraMenuId, 
                                            "documentUrlPatterns":["*://*.gametz.com/*"]});
        gtzcItems[id] = item;                                        
    }

    // console menu
    for (var i = 0; i < consoleItems.length; i++) {
        var item = consoleItems[i];
        var title = item.name;
        var id = chrome.contextMenus.create({"title": title, "contexts":['editable'],
                                            "onclick": gtzCodeInsert,
                                            "parentId": consoleMenuId, 
                                            "documentUrlPatterns":["*://*.gametz.com/*"]});
        gtzcItems[id] = item;                                        
    }


    // smileys menu
    for (var i = 0; i < smileyItems.length; i++) {
        var item = smileyItems[i];
        var title = item.name;
        var id = chrome.contextMenus.create({"title": title, "contexts":['editable'],
                                            "onclick": gtzCodeInsert,
                                            "parentId": smileyMenuId, 
                                            "documentUrlPatterns":["*://*.gametz.com/*"]});
        gtzcItems[id] = item;                                        
    }


    // other emoticons
    for (var i = 0; i < iconItems.length; i++) {
        var item = iconItems[i];
        var title = item.name;
        var id = chrome.contextMenus.create({"title": title, "contexts":['editable'],
                                            "onclick": gtzCodeInsert,
                                            "parentId": emoticonMenuId, 
                                            "documentUrlPatterns":["*://*.gametz.com/*"]});
        gtzcItems[id] = item;                                        
    }

    // gtz tags menu
    for (var i = 0; i < gtzItems.length; i++) {
        var item = gtzItems[i];
        var title = item.name;
        var id = chrome.contextMenus.create({"title": title, "contexts":['editable'],
                                            "onclick": gtzCodeInsert,
                                            "parentId": gtzMenuId, 
                                            "documentUrlPatterns":["*://*.gametz.com/*"]});
        gtzcItems[id] = item;                                        
    }

}