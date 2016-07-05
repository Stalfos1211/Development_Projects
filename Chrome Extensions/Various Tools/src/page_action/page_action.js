// page_action.js

var inputs = [['#input1', 'Username'],['#input2', 'Password'],['#input3', 'Pin']];

function generateScript(selector, text){

	var scripts = "var eventChange = new Event('change');" +
					"var eventFocus = new Event('focus');" +
					"var eventBlur = new Event('blur');" +
					"document.querySelector('"+ selector +"').value = '"+ text +"';" +
					"document.querySelector('"+ selector +"').dispatchEvent(eventFocus);" + 
					"document.querySelector('"+ selector +"').dispatchEvent(eventChange);" + 
					"document.querySelector('"+ selector +"').dispatchEvent(eventBlur);"

	return scripts;
}

var code = generateScript();

console.log('final code: ', code);

document.getElementById('test').onclick = function(){
	
	chrome.runtime.sendMessage({
      type: 'runInjectScript'//,
      //text: 'just testing'
    });

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		/*chrome.tabs.executeScript(tabs[0].id, {code: inputValues}, function(response) {

		});*/

		for (var i = 0; i < inputs.length; i++) {
			chrome.tabs.executeScript(tabs[0].id, {code: generateScript(inputs[i][0], inputs[i][1])}, function(response) {

			});
		}
	});
}