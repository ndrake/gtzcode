var last_target = null;
document.addEventListener('mousedown', function(event){
  //possibility: check that the mouse button == 2
  last_target = event.target;
}, true);


var booger = null;
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        
        // Set value of last_target to be item's text
        if(request.item) {
            booger = request;
            last_target.value += request.item.text;
            
        } else { console.log("No item???");}
        
        sendResponse({}); // snub them.        
    }
);
  
