chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.active) {
      setTimeout(() => {
        chrome.tabs.executeScript(null, {file: "popup.js"});
      }, 3000); // 3000 = delay in milliseconds (3 seconds)
    }
})