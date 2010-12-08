// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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


// Create one test item for each context type.
var contexts = ["page","selection","link","editable","image","video",
                "audio"];

// Maps menuItemId to the items array above
// Kind of a hack because I don't know a better way to get the item data in gtzCodeInsert()        
var gtzcItems = {};                

var emoticonMenuId = chrome.contextMenus.create({"title":"Emoticons", "contexts":['editable'], "documentUrlPatterns":["*://*.gametz.com/*"]});
var smileyMenuId = chrome.contextMenus.create({"title":"Smileys", "contexts":['editable'], "parentId":emoticonMenuId, "documentUrlPatterns":["*://*.gametz.com/*"]});
var consoleMenuId = chrome.contextMenus.create({"title":"Console", "contexts":['editable'], "parentId":emoticonMenuId, "documentUrlPatterns":["*://*.gametz.com/*"]});

var gtzMenuId = chrome.contextMenus.create({"title":"GTZ", "contexts":['editable'], "documentUrlPatterns":["*://*.gametz.com/*"]});


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

