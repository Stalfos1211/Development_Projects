
// Data sent to pop-up(browser_action) about template that is a match
var templateInfo = {};
// Used to keep track of which is the current tab's icon to enabled/disable
var tabId;

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

// Update the info
function updateInfo() {
	chrome.tabs.getSelected(null,function(tab) {
		// Check if actually a tab and not (ex console window)
		if (tab.id > -1) {
			tabId = tab.id;
	    	matchUrl(tab.url);
    	}
    });
}

// Checks if current url matches any template that is listed
function matchUrl(url) {

	// Test match each item on the template list
	for (var i=0; i < templateList.length; i++) {

		// Initial check if match
		if (url.toLowerCase().indexOf(templateList[i].urlToMatch.toLowerCase()) > -1) {

			// Check if extra strings for matching exist
			if(templateList[i].contains) {

				// Extra string check if match
				if(url.indexOf(templateList[i].contains))  {
					
					iconEnabled(true);
					templateInfo = {"name" : templateList[i].templateName, "id" : getId(url, templateList[i].findIdText)};
					
					return;
				}
			}
			// No extra string to check
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

// Enables/Disables icon on the browser
function iconEnabled(foundMatch) {
	if (foundMatch) {
		chrome.browserAction.setTitle({title: "Template Match"});
		chrome.browserAction.enable(tabId);
	}
	else {
		chrome.browserAction.setTitle({title: "No Match"});
		chrome.browserAction.disable(tabId);
	}
}

function getId(url, findIdText) {

	var id = '';

	if (findIdText) {

		for (var j = 0; j < findIdText.length; j++) {

			// Get text in between the two declared strings
			// If second string is provided
			if (findIdText[j][1]) {

				var text = url.toLowerCase().match(findIdText[j][0].toLowerCase() + '(.*)' + findIdText[j][1].toLowerCase());
				if (text) {
					if (j>0){id += ','};
					id += text[1];
				}
				else {
					// couldn't find id with the provided strings
					console.log('couldn\'t find match')
				}
			}
			// Get text after declared string
			else {
				
				if (url.indexOf(findIdText[j][0]) > -1) {
					var beginning = url.toLowerCase().indexOf(findIdText[j][0].toLowerCase()) + findIdText[j][0].length;
					if (j>0){id += ','};
					id += url.substr( beginning, url.length );
				}
			}
		}

	}
	else {
		id = 'no id';
	}
	return id;
}

// Send data to pop-up (browser_action) when requested
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "getTemplateInfo")
      sendResponse({
        templateInfo: templateInfo
      });
  });


// The list
// templateName - name of the template that is displayed on the pop-up
// urlToMatch - string used to match the the url
// contains - extra string for matching urls with gaps ex(http://www.somewebsite/(theId)/login.asp)
// findIdText - find id between declared strings ["stringBeforeId", "stringAfterId"] two strings
//              find id after declared strings ["theIdIsAfterThisString"] one string

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
	// Need to double check on this
	// https://property.onesite.realpage.com/welcomehome/home/login?siteId=3025623#url=%23login
	"templateName" : "Realpage Welcomehome",
	"urlToMatch" : "https://property.onesite.realpage.com/welcomehome/home/login?siteId",
	"findIdText" : [["siteId=", "#url=%23login"]],
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
	"findIdText" : [["residentservices/", "/userlogin.aspx"]],
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
	//need id for sign up required for other properties
	// ex http://barringtonapartmentsaustin.com/
	"templateName" : "Yapstone",
	"urlToMatch" : "https://www.rentpayment.com/pay/login.html",
	"findIdText" : [["login.html?pc="]]
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
	"urlToMatch" : "oscp/OnlineServices/FeaturesLogin",
	"findIdText" : [["https://", "/oscp/"]]
	}
	/*,
	{
	"templateName" : "Google",
	"urlToMatch" : "google.com"
	}*/

];


// Copy to clipboard work around mess
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