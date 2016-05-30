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

			iconEnabled(true);

			templateInfo = {"name" : templateList[i].templateName, "id" : getId(url, templateList[i].findIdText)};
			
			return;
		} 
		else {
			iconEnabled(false);
		}
	}
}

function iconEnabled(foundMatch) {
	if (foundMatch) {
		chrome.browserAction.setTitle({title: "Template Match"});
		chrome.browserAction.enable();
	}
	else {
		chrome.browserAction.setTitle({title: "No Match"});
		chrome.browserAction.disable();
	}
}

var templateList = [

	{
	"templateName" : "Resident Portal",
	"urlToMatch" : "residentportal.com/resident_portal/?module=authentication&action=view_login",
	"findIdText" : [["https://", ".residentportal.com/"]]
	},
	{
	"templateName" : "Secure Cafe",
	"urlToMatch" : "securecafe.com/residentservices/",
	"findIdText" : [["https://", ".securecafe"], ["residentservices/", "/userlogin.aspx"]]
	},
	{
	"templateName" : "Google",
	"urlToMatch" : "google.com"
	}

];

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.test == "get")
      sendResponse({
        templateInfo: templateInfo
      });
  });

function getId(url, findIdText) {

	var id = '';

	if (findIdText) {

		for (var j = 0; j < findIdText.length; j++) {

			var text = url.match(findIdText[j][0] + '(.*)' + findIdText[j][1]);
			if (j>0){id += ','};
			id += text[1];
		}

	}
	else{
		id = 'no id';
	}
	return id;

}