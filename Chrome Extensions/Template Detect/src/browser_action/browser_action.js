
var id = '';

chrome.browserAction.onClicked.addListener(getTemplateInfo());

function getTemplateInfo(){
  chrome.runtime.sendMessage({
      test: "get"
    },
    function(response) {
      console.log('response', response.templateInfo);
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