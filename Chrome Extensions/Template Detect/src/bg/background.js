// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
/*chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

var currentUrl = '';*/

/*chrome.webNavigation.onCompleted.addListener(function(e) {
	var currentUrl = (e.url == 'about:blank') ? currentUrl : e.url;
	console.log('onCompleted', currentUrl)
	chrome.tabs.getSelected(null,function(tab) {
	    var tablink = tab.url;
	    console.log(tablink)
	});
});*/

/*chrome.webNavigation.onCommitted.addListener(function(e) {
	var currentUrl = (e.url == 'about:blank') ? currentUrl : e.url
	console.log('onCommited', currentUrl)
});*/

/*chrome.webNavigation.onDOMContentLoaded.addListener(function(e) {
	var currentUrl = (e.url == 'about:blank') ? currentUrl : e.url
	//console.log('onDOMContentLoaded', currentUrl)
	chrome.tabs.getSelected(null,function(tab) {
	    var tablink = (tab.url) ? tab.url : '';
	    console.log(tablink)
	});
});
*/



console.log("I am background.js");

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "hello")
      sendResponse({
        msg: "goodbye!"
      });
  });


var currentUrl =  '';

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