chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		if (response.message == 'login') {
			login(response.loginData.inputList)
		}

	}
	}, 10);
});


function login(loginInfo) {

	for (var i = 0; i < loginInfo.length; i++) {
		document.querySelector(loginInfo[i].input).value = loginInfo[i].value;
	}
}