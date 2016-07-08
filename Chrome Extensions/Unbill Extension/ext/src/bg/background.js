var loginData;
var targetTab;

// Listen for webpage message
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (request.message == 'login') {
      loginData = request;
      newIncognitoWindow(loginData.url);
    }
  });

// Open new incognito window
function newIncognitoWindow(url){
  chrome.windows.create({"url": url, "incognito": false});
  chrome.tabs.query({active: true, currentWindow: true},function(tabs){console.log('newly created tab', targetTab = tabs[0].id)});
}

// Listen for new incognito window to finish loading
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    //console.log('bg listening: webpage finshed loading')
    //console.log('messages', sender)


        //chrome.tabs.duplicate(tabs[0].id, function (){})
        //chrome.tabs.executeScript(targetTab, {code: code}, function() {

        //})

    //chrome.tabs.executeScript(sender.tab.id, {code: code}, function(response) { });
    /*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {


        chrome.tabs.executeScript(tabs[0].id, {code: code}, function(response) {

        });

      });*/
    if (sender.tab.id == targetTab) {
      sendResponse({message:'login', loginData: loginData});
      //chrome.tabs.getCurrent(function(tab){console.log('tab:',tab)})
      chrome.permissions.getAll(function(permissions){console.log(permissions)})
      setTimeout(function(){chrome.tabs.executeScript(targetTab, {code: code}, function() {})}, 1000)
      
    }

  });

var code = 'alert("test works")';