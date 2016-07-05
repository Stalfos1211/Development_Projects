// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		//console.log('request:',request)
		//console.log('sender:',sender)

		if (request.type == 'init') {
			chrome.pageAction.show(sender.tab.id);
			sendResponse(console.log('background working'));
		}

		// Receive from page action(pop-up button)
		if (request.type == 'runInjectScript') {
			sendResponse(console.log('from background'));

			/*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.executeScript(tabs[0].id, {code: code}, function(response) {

				});
			});*/

		}
});

//var code = "console.log('fillInputs()')"

/*chrome.runtime.onMessage.addListener(function(message) {
    if (message && message.type == 'copy') {
        console.log('Message Recieved')
    }
});*/