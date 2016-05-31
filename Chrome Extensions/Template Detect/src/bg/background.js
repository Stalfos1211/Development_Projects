
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
	"templateName" : "RentPayment",
	"urlToMatch" : "https://www.rentpayment.com/pay/login.html",
	"findIdText" : [["pay/login.html?pc="]]
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

			// Get text in between
			if (findIdText[j][1]) {
				var text = url.match(findIdText[j][0] + '(.*)' + findIdText[j][1]);
				if (j>0){id += ','};
				id += text[1];
			}
			// Get text after
			else {
				var beginningtext = findIdText[j][0];
				var beginning = url.indexOf(beginningtext) + beginningtext.length;
				id = url.substr( beginning, url.length );
			}
		}

	}
	else{
		id = 'no id';
	}
	return id;

}



chrome.runtime.onMessage.addListener(function(message) {
    if (message && message.type == 'copy') {
        var input = document.createElement('textarea');
        document.body.appendChild(input);
        input.style.position = 'fixed';
  		input.style.opacity = 0;
        input.value = message.text;
        input.focus();
        input.select();
        document.execCommand('Copy');
        input.remove();
    }
});