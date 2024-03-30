chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.active) {
    setTimeout(() => {
      chrome.tabs.executeScript(tabId, { file: "popup.js" });
    }, 0);
  }
});
