//document.addEventListener('DOMContentLoaded', function() {
//    alert("a");
//});

//chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
//
//    alert("asdfj");
//    console.log('Turning ' + tab.url + ' red!');
//      chrome.tabs.executeScript({
//        code: 'document.body.style.backgroundColor="blue"'
//      });
//
//});

chrome.webNavigation.onCompleted.addListener( function (tab) {

//    alert('Turning ' + tab.url + ' red!');
      chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="blue"'
      });

});

//chrome.tabs.executeScript({ code: "console.log('dsff');" }, function() {
//    if (chrome.runtime.lastError) {
//         console.log("ERROR: " + chrome.runtime.lastError.message);
//    }
//});