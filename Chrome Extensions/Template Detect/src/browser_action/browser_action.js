
var id = '';

if (chrome.browserAction) {
  chrome.browserAction.onClicked.addListener(getTemplateInfo());
}

function getTemplateInfo(){
  chrome.runtime.sendMessage({
      get: "templateInfo"
    },
    function(response) {
      document.getElementById("template-name").textContent = response.templateInfo.name;
      document.getElementById("template-id").textContent = response.templateInfo.id;
      id = response.templateInfo.id;
    });
}

document.getElementById('copy-id').onclick = function(){
  chrome.runtime.sendMessage({
    type: 'copy',
    text: id
});
}