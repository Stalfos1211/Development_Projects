chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		if (response) {
			login(response);
		}

		/*var code = "document.querySelector('input[name=\"username\"]').value = username;"
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.executeScript(tabs[0].id, {code: code}, function(response) {

			});
		});*/

	}
	}, 10);
});


function login(loginInfo) {

	for (var i = 0; i < loginInfo.length; i++) {
		document.querySelector(loginInfo[i].input).value = loginInfo[i].value;
	}
}


/*chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		username = 'testingthis';
		console.log('there was a message missed')
		//console.log('request:',request)
		//console.log('sender:',sender)

		// Received from background
		if (request.type == 'login') {
			console.log('received login request from background');
			sendResponse(console.log('background working'));
		}
});*/