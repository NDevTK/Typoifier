chrome.tabs.onActivated.addListener(activeInfo => {
  activeTab = activeInfo.tabId; // Current tab
  chrome.tabs.sendMessage(activeTab, true);
});
