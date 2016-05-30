//alert('working')

/*var btn = document.getElementById('copy-id');

btn.addEventListener("click", btnClick);

function btnClick(){

	//alert('button test');

	try {
    	alert($);
	}
	catch(err) {
	    document.getElementById("demo").innerHTML = err.message;
	}
}*/

var link = '';

console.log("I am popup.js");

/*document.getElementById("copy-id").onclick = function(e){
  hello();
}

function hello() {
  console.log("hello");
  chrome.runtime.sendMessage({
      greeting: "hello"
    },
    function(response) {
      document.getElementById("template-name").textContent = response.url;
    });
}*/

chrome.browserAction.onClicked.addListener(test())

function test(){
  chrome.runtime.sendMessage({
      greeting: "hello"
    },
    function(response) {
      document.getElementById("template-name").textContent = response.url;
    });
}

/*chrome.browserAction.onClicked.addListener(
  function (tabs) {
    alert('test alert from popup');
    console.log('browserAction a:', tabs);
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.log('message recieved')
    if( request.message === "tab_activated") {
    	console.log('message recieved tab has been activated');
    	alert('message recieved tab has been activated');
    }

});*/

//$('#template-name').text('this is a test');
//console = chrome.extension.getBackgroundPage().console
//alert(chrome.extension.getBackgroundPage().link)

//chrome.extension.getBackgroundPage().variable = 42;