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

/*
<!ENTITY gtzcode.lol "*lol*">
<!ENTITY gtzcode.huh "*huh*">
<!ENTITY gtzcode.duh "*duh*">
<!ENTITY gtzcode.pp "*pp*">
<!ENTITY gtzcode.star "*star*">
<!ENTITY gtzcode.bstar "*bstar*">
<!ENTITY gtzcode.sstar "*sstar*">
<!ENTITY gtzcode.gstar "*gstar*">
<!ENTITY gtzcode.2star "*2gstar*">
<!ENTITY gtzcode.3star "*3gstar*">
<!ENTITY gtzcode.4star "*4gstar*">
<!ENTITY gtzcode.5star "*5gstar*">
<!ENTITY gtzcode.globe "*globe*">
<!ENTITY gtzcode.gglobe "*gglobe*">
<!ENTITY gtzcode.new "*new*">
<!ENTITY gtzcode.chatting "*chatting*">
<!ENTITY gtzcode.match "*match*">
<!ENTITY gtzcode.shake "*shake*">
<!ENTITY gtzcode.check "*check*">
<!ENTITY gtzcode.uncheck "*uncheck*">
<!ENTITY gtzcode.idea "*idea*">
<!ENTITY gtzcode.yes "*yes*">
<!ENTITY gtzcode.no "*no*">
<!ENTITY gtzcode.exc "*!*">
<!ENTITY gtzcode.ques "*?*">
<!ENTITY gtzcode.warning "*warning*">
<!ENTITY gtzcode.mail "*mail*">
<!ENTITY gtzcode.heart "&lt;3">
<!ENTITY gtzcode.bheart "&lt;/3">
<!ENTITY gtzcode.nes "*nes*">
<!ENTITY gtzcode.snes "*snes*">
<!ENTITY gtzcode.n64 "*n64*">
<!ENTITY gtzcode.gba "*gba*">
<!ENTITY gtzcode.gc "*gc*">
<!ENTITY gtzcode.ds "*ds*">
<!ENTITY gtzcode.wii "*wii*">
<!ENTITY gtzcode.ps1 "*ps1*">
<!ENTITY gtzcode.ps2 "*ps2*">
<!ENTITY gtzcode.ps3 "*ps3*">
<!ENTITY gtzcode.psp "*psp*">
<!ENTITY gtzcode.xbox "*xbox*">
<!ENTITY gtzcode.360 "*360*">
<!ENTITY gtzcode.pc "*pc*">
<!ENTITY gtzcode.genesis "*genesis*">
<!ENTITY gtzcode.saturn "*saturn*">
<!ENTITY gtzcode.dc "*dc*">
<!ENTITY gtzcode.dvd "*dvd*">
<!ENTITY gtzcode.bluray "*bluray*">
<!ENTITY gtzcode.hddvd "*hddvd*">
*/



var items = [
    {
        "name" : "smiley",
        "text" : ":-)",
        "icon" : "img/smiley.gif"
    },
    {
        "name" : "frown",
        "text" : ":-(",
        "icon" : "img/smiley_f.gif"
    },
    {
        "name" : "wink",
        "text" : ";-)",
        "icon" : "img/smiley_w.gif"
    },
    {
        "name" : "poker",
        "text" : ":-|",
        "icon" : "img/smiley_p.gif"
    },
    {
        "name" : "raspberry",
        "text" : ":-p",
        "icon" : "img/smiley_t.gif"
    },
    {
        "name" : "winking raspberry",
        "text" : ";-p",
        "icon" : "img/smiley_wt.gif"
    },
    {
        "name" : "surprise",
        "text" : ":-o",
        "icon" : "img/smiley_s.gif"
    },
    {
        "name" : "cool",
        "text" : "8-)",
        "icon" : "img/smiley_c.gif"
    },
    {
        "name" : "cool grin",
        "text" : "8-D",
        "icon" : "img/smiley_gd.gif"
    },
    {
        "name" : "grin",
        "text" : ":-D",
        "icon" : "img/smiley_d.gif"
    },
    {
        "name" : "envy",
        "text" : "*envy*",
        "icon" : "img/smiley_j.gif"
    },
    {
        "name" : "wince",
        "text" : "*wince*",
        "icon" : "img/smiley_wnc.gif"
    },
    {
        "name" : "yawn",
        "text" : "*yawn*",
        "icon" : "img/smiley_y.gif"
    },
    {
        "name" : "shock",
        "text" : "*shock*",
        "icon" : "img/smiley_ss.gif"
    },
    {
        "name" : "wry",
        "text" : ":-/",
        "icon" : "img/smiley_wr.gif"
    },
    {
        "name" : "angry",
        "text" : ">:-(",
        "icon" : "img/smiley_a.gif"
    },
    {
        "name" : "evil",
        "text" : ">:-)",
        "icon" : "img/smiley_e.gif"
    },
    {
        "name" : "dead",
        "text" : "X-P",
        "icon" : "img/smiley_x.gif"
    }, 
    {
        "name" : "roll eyes",
        "text" : "*roll*",
        "icon" : "img/smiley_rl.gif"
    }
    
];


// Create one test item for each context type.
var contexts = ["page","selection","link","editable","image","video",
                "audio"];

// Maps menuItemId to the items array above
// Kind of a hack because I don't know a better way to get the item data in gtzCodeInsert()        
var gtzcItems = {};                

for (var i = 0; i < items.length; i++) {
    //alert(items[i].name);
    var item = items[i];
    var title = item.name;
    var id = chrome.contextMenus.create({"title": title, "contexts":['editable'],
                                        "onclick": gtzCodeInsert,
                                        "documentUrlPatterns":["*://*.gametz.com/*"]});
    gtzcItems[id] = item;                                        
    //console.log("'" + contexts + "' item:" + id);
}


