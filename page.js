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
                        
            //last_target.value += request.item.text;
            insertAtCaret(last_target, request.item.text);
            
        } else { console.log("No item???");}
        
        sendResponse({}); // snub them.        
    }
);
  
// Modified from: http://www.scottklarr.com/topic/425/how-to-insert-text-into-a-textarea-where-the-cursor-is/
function insertAtCaret(theArea, text) {
    var txtarea = theArea;
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? "ff" : (document.selection ? "ie" : false ) );

    // if (br == "ie") {
    //     txtarea.focus();
    //     var range = document.selection.createRange();
    //     range.moveStart('character', -txtarea.value.length);
    //     strPos = range.text.length;
    // } else 
    if (br == "ff") strPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0, strPos);
    var back = (txtarea.value).substring(strPos, txtarea.value.length);

    txtarea.value = front + text + back;
    strPos = strPos + text.length;

    // if (br == "ie") {
    //     txtarea.focus();
    //     var range = document.selection.createRange();
    //     range.moveStart('character', -txtarea.value.length);
    //     range.moveStart('character', strPos);
    //     range.moveEnd('character', 0);
    //     range.select();
    // } 
    // 
    //else
     if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }

    txtarea.scrollTop = scrollPos;
}