console.log("I am background.js");

var currentUrl = '';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "hello")
      sendResponse({
        url: currentUrl
      });
  });

// When tab finish updating update the current url
chrome.tabs.onUpdated.addListener(function(tabId , info) {
    if (info.status == "complete") {

        chrome.tabs.getSelected(null,function(tab) {
        	var tablink = tab.url;
        	currentUrl = tablink;
	    });
    }
});

// When switching tabs update current url
chrome.tabs.onActivated.addListener(function(tabId , info) {

        //console.log('tabId',tabId)
        //console.log(info)
        chrome.tabs.getSelected(null,function(tab) {
        	var tablink = tab.url;
	    	console.log('onActivated',tablink)
	    	currentUrl = tablink;
	    	chrome.tabs.sendMessage(tabId.tabId, {"message": "tab_activated"});
	    });
});


function matchUrl() {

}

/*var currentUrl =  '';

chrome.tabs.onUpdated.addListener(function(tabId , info) {
    if (info.status == "complete") {

        //console.log(info)
        chrome.tabs.getSelected(null,function(tab) {
        	var tablink = tab.url;
        	currentUrl = tablink;
	    	console.log('onUpdated',tablink)
	    });
    }
});

chrome.tabs.onActivated.addListener(function(tabId , info) {

        //console.log('tabId',tabId)
        //console.log(info)
        chrome.tabs.getSelected(null,function(tab) {
        	var tablink = tab.url;
	    	console.log('onActivated',tablink)
	    	currentUrl = tablink;
	    	chrome.tabs.sendMessage(tabId.tabId, {"message": "tab_activated"});
	    	console.log('test', document.getElementById('#copy-id'))
	    });
});

chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    
    chrome.tabs.sendMessage(tabId.tabId, {"message": "tab_activated"});

    //sendVarsToPopup();

    console.log('BG CLICKED')

  });
})


function changeIcon() {

	// Change Icon
	//chrome.browserAction.setTitle({title: "testing"});
	//chrome.browserAction.disable()
}*/

/*function sendVarsToPopup(){
	var popups = chrome.extension.getViews({type: "popup"});
	if (0 < popups.length) {
		var test popups[0].link = 42;
	}
}*/

/*var popups = chrome.extension.getViews({type: "popup"});
if (0 < popups.length) {
 var test popups[0].variable = 42;
}*/