
var currentUrl = '';
var templateInfo = {};

// When tab finish loading update the current url
chrome.tabs.onUpdated.addListener(function(tabId , info) {
    if (info.status == "complete") {
        updateInfo();
    }
});

// When switching tabs update current url
chrome.tabs.onActivated.addListener(function(tabId , info) {
        updateInfo();
});

// When switching windows update current url
chrome.windows.onFocusChanged.addListener(function(windowId) {
	updateInfo();
})


function updateInfo() {
	chrome.tabs.getSelected(null,function(tab) {
    	var currentUrl = tab.url;
    	matchUrl(currentUrl);
    });
}

function matchUrl(url) {

	// Test match each item on the template list
	for (var i=0; i < templateList.length; i++){

		// Initial check if match
		if (url.indexOf(templateList[i].urlToMatch) > -1) {

			// Check if extra strings for matching exist
			if(templateList[i].contains) {

				// Extra check if match
				if(url.indexOf(templateList[i].contains))  {
					iconEnabled(true);

					templateInfo = {"name" : templateList[i].templateName, "id" : getId(url, templateList[i].findIdText)};
					
					return;
				}
			}
			else {
				iconEnabled(true);

				templateInfo = {"name" : templateList[i].templateName, "id" : getId(url, templateList[i].findIdText)};
				
				return;

			}
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
	"templateName" : "Municipal Online Payments",
	"urlToMatch" : "https://www.municipalonlinepayments.com/",
	"findIdText" : [["municipalonlinepayments.com/", "/login"]],
	"contains" : "/login"
	},
	{
	"templateName" : "Appfolio",
	"urlToMatch" : ".appfolio.com/connect/users/sign_in",
	"findIdText" : [["https://", ".appfolio.com/connect/users/sign_in"]]
	},
	{
	"templateName" : "Smartclick",
	"urlToMatch" : "https://smartclick.campusapts.com/Login.aspx"
	},
	{
	"templateName" : "Realpage Welcomehome",
	"urlToMatch" : "https://property.onesite.realpage.com/welcomehome",
	"findIdText" : [["welcomehome/?siteid=", ".#url=%23login"]],
	"contains" : "#url=%23login"
	},
	{
	// need id for sign up
	"templateName" : "Realpage Activebuilding",
	"urlToMatch" : "https://login.activebuilding.com/auth/login"
	},
	{
	// for testing https://property.onesite.realpage.com/templates/template_concept03/login/login.asp?w=havenoaksapts
	"templateName" : "Realpage ResidentPortal",
	"urlToMatch" : "https://property.onesite.realpage.com/templates/",
	"findIdText" : [["templates/", "/login/"],["/login/login.asp?w="]],
	"contains" : "/login/login.asp?w="
	},
	{
	"templateName" : "Rentcafe SecureCafe",
	"urlToMatch" : ".securecafe.com/residentservices/",
	"findIdText" : [["https://", ".securecafe.com/residentservices/"],[".securecafe.com/residentservices/", "/userlogin.aspx"]],
	"contains" : "/userlogin.aspx"
	},
	{
	"templateName" : "Rentcafe Resident Services",
	"urlToMatch" : "https://www.rentcafe.com/residentservices/",
	"findIdText" : [["https://", "/userlogin.aspx"]],
	"contains" : "/userlogin.aspx"
	},
	{
	"templateName" : "Property Solutions",
	"urlToMatch" : ".residentportal.com/resident_portal/?module=authentication",
	"findIdText" : [["https://", ".residentportal.com/"]]
	},
	{
	"templateName" : "Paylease",
	"urlToMatch" : "https://www.paylease.com/login"
	},
	{
	//need id for sign up
	"templateName" : "Yapstone",
	"urlToMatch" : "https://www.rentpayment.com/pay/login.html"
	},
	{
	"templateName" : "Aptexx",
	"urlToMatch" : ".aptexx.com/auth/index/cid/",
	"findIdText" : [["https://", ".aptexx.com/"], ["index/cid/"]]
	},
	{
	"templateName" : "Smartclick",
	"urlToMatch" : "https://smartclick.campusapts.com/Login.aspx"
	},
	{
	"templateName" : "Student Housing Cafe",
	"urlToMatch" : "https://www.studenthousingcafe.com/residentservices/",
	"contains" : "/userlogin.aspx",
	"findIdText" : [["residentservices/", "/userlogin.aspx"]]
	},
	{
	"templateName" : "Smarthub",
	"urlToMatch" : ".smarthub.coop/Login.html",
	"findIdText" : [["https://", ".smarthub"]]
	},
	{
	"templateName" : "Convergentcare",
	"urlToMatch" : ".convergentcare.com/",
	"contains" : "/goToLogin.action",
	"findIdText" : [["https://", ".convergentcare"]]
	},
	{
	"templateName" : "OSCP",
	"urlToMatch" : "https://billing",
	"contains" : "/oscp/",
	"findIdText" : [["billing.", "/oscp/"]]
	}
	/*,
	{
	"templateName" : "Google",
	"urlToMatch" : "google.com"
	}*/

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
				if (j>0){id += ','};
				id += url.substr( beginning, url.length );
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