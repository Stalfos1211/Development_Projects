// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
/*chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });
*/

var loginInfo;

// Listen for webpage message
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    console.log('message received: ',request, sender)
    if (request.message == 'login') {
      loginInfo = request.loginInfo;
      password = request.password;
      login(request.url);
    }
  });

// Open new incognito window
function login(url){
  console.log('create new incognito window');
  chrome.windows.create({"url": url, "incognito": true});
}

// Listen for new incognito window to finish loading
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('bg listening: webpage finshed loading')
    sendResponse(loginInfo);
  });

/*function(){
    console.log('sending message to inject')
    // Send message to injected script
    chrome.extension.sendMessage(
      {
        type: 'login',
        username: username,
        password: password
      }, function(response) {

    });

  }*/