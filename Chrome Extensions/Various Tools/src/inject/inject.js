chrome.extension.sendMessage({type:'init'}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
		//appendScript();
	}
	}, 10);
});

/*var code = "function fillInputs() {" +
	"$('#test').val('testing');" +
	"$('#test').trigger('change');" +
	"}"*/

var code = "$('#test').val('testing');" +
	"$('#test').trigger('change');"


function appendScript() {
    var head = document.getElementsByTagName("head")[0];
    var js = document.createElement("script");
    js.type = "text/javascript";
    js.textContent = code;
    head.appendChild(js);
    js.parentNode.removeChild(js);
}