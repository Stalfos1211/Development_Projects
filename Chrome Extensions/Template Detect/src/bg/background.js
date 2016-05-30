console.log("I am background.js");

var currentUrl = '';
var templateInfo = {};

// When tab finish loading update the current url
chrome.tabs.onUpdated.addListener(function(tabId , info) {
    if (info.status == "complete") {

        chrome.tabs.getSelected(null,function(tab) {
        	var currentUrl = tab.url;
        	matchUrl(currentUrl);
	    });
    }
});

// When switching tabs update current url
chrome.tabs.onActivated.addListener(function(tabId , info) {

        //console.log('tabId',tabId)
        //console.log(info)
        chrome.tabs.getSelected(null,function(tab) {
        	var currentUrl = tab.url;
	    	matchUrl(currentUrl);
	    });
});


function matchUrl(url) {

	var name = '';
	var id = '';

	// Test match each item on the template list
	for (var i=0; i < templateList.length; i++){
		if (url.indexOf(templateList[i].urlToMatch) > -1) {

			console.log('match found: ',templateList[i].templateName);

			foundMatch(true);

			// Send data to pop-up
			templateInfo = {"name" : templateList[i].templateName, "id" : 'theId'};
			
			return;
		} 
		else {
			foundMatch(false);
		}
	}
}

function foundMatch(match) {
	if (match) {
		chrome.browserAction.setTitle({title: "Template Match"});
		chrome.browserAction.enable();
		//return {"name" : name, "id" : id};
	}
	else {
		chrome.browserAction.setTitle({title: "No Match"});
		chrome.browserAction.disable();
	}
}

var templateList = [

	{
	"templateName" : 'Resident Portal',
	"urlToMatch" : 'residentportal.com/resident_portal/?module=authentication&action=view_login'
	},
	{
	"templateName" : 'Google',
	"urlToMatch" : 'google.com'
	}

];

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.test == "get")
      sendResponse({
        templateInfo: templateInfo
      });
  });