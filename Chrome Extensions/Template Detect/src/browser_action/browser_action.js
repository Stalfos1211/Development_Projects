
var id = '';
var buttonEnabled = false;

chrome.browserAction.onClicked.addListener(getTemplateInfo());

function getTemplateInfo(){
  chrome.runtime.sendMessage({
      message: "getTemplateInfo"
    },
    function(response) {

      // Don't run till elements exist
      if (document.getElementById("template-name")) {
        document.getElementById("template-name").textContent = response.templateInfo.name;
        document.getElementById("template-id").textContent = response.templateInfo.id;
        id = response.templateInfo.id;
      }
      
      // Add on click to button only once
      if(document.getElementById('copy-id')) {
        if (!buttonEnabled) {
          buttonEnabled = true;
          document.getElementById('copy-id').onclick = function(){
            chrome.runtime.sendMessage({
              type: 'copy',
              text: id
            });
          }
        }

      }

    });
}