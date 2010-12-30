function openAbout() {
   chrome.tabs.create({ url: "about.html" });
}


function checkMessages() {

    //var checkUrl = 'http://gametz.com/SignOn.html';
    //var checkUrl = 'http://localhost:8080/GameTZ%20-%20Sign%20On.html';    
    //http://gametz.com/?A=Data
    var checkUrl = 'http://localhost:8080/data'
    
    $.ajax({
        url: checkUrl,
        dataType:"json",
        success: function(data) {
            console.log(data);
            console.log("checking! " + data);
            console.log("user: " + data.user);
            console.log("pms: " + data.PMs);
            console.log("Offers: " + data.Offers);
            // if($(data).find("img[alt='You have New Messages!']").length >0 ) {
            //     console.log('found!!!!!');
            // } else console.log('not found');
            // 
            
            if(data.PMs > 0) {
                chrome.browserAction.setBadgeText({text:''+data.PMs});
            }
        }
    });
    
    
}