
function saveOptions() {
        
    localStorage['gtz_show_notifications'] = document.getElementById('gtz_show_notifications').checked;        
    

    localStorage['gtz_check_messages'] = document.getElementById('gtz_check_messages').checked;        
    
    var backgroundPage = chrome.extension.getBackgroundPage();
    backgroundPage.init();
}

function restoreOptions() {
    
    console.log("restoring options");
    
    var showNotifications = localStorage['gtz_show_notifications'];
    if(showNotifications == "true") {
        
        document.getElementById('gtz_show_notifications').checked = true;        
        
    }
 
    var checkMessages = localStorage['gtz_check_messages'];
     if(checkMessages == "true") {

         document.getElementById('gtz_check_messages').checked = true;        

     }
    
}