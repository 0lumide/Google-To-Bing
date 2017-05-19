chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    console.log('Page uses History API and we heard a pushSate/replaceState.');
    chrome.tabs.sendMessage(details.tabId, {"event": "historyChange"});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log('Tab updated');
    chrome.tabs.sendMessage(tabId, {"event": "tab Updated"});
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    console.log('Tab activated');
    chrome.tabs.sendMessage(activeInfo.tabId, {"event": "tab Activated"});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    chrome.contextMenus.removeAll();
    chrome.contextMenus.create({"title":request.title, "onclick": contextMenuOnClicked});
});

function contextMenuOnClicked(info, tab) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  		chrome.tabs.sendMessage(tabs[0].id, {"event" : "contextMenuAction"}, function(response) {
			chrome.tabs.update(null, {
    			url: response.url
			});
  		});
	});
}
