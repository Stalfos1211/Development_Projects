
console.log("I am popup.js");


chrome.browserAction.onClicked.addListener(getTemplateInfo())

function getTemplateInfo(){
  chrome.runtime.sendMessage({
      test: "get"
    },
    function(response) {
      console.log('response', response.templateInfo);
      document.getElementById("template-name").textContent = response.templateInfo.name;
    });
}

/*document.getElementById("copy-id").onclick = function(e){
  copyToClipboard('test copy');
}*/

/*function copyToClipboard(text) {
  //document.execCommand('copy');
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}*/