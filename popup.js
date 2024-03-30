document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("hideElementsBtn").addEventListener("click", function () {
    const classNames = document
      .getElementById("classNames")
      .value.split(",")
      .map((className) => className.trim());

    const ids = document
      .getElementById("ids")
      .value.split(",")
      .map((id) => id.trim());

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      //save this info to localStorage to persist the changes on another load
      const currentUrl = new URL(tabs[0].url).origin;
      const last = JSON.parse(localStorage.getItem(currentUrl)) || { classNames: [], ids: [] };

      const allClassNames = [...last.classNames, ...classNames].filter((item) => item);
      const allIds = [...last.ids, ...ids].filter((item) => item);

      localStorage.setItem(
        currentUrl,
        JSON.stringify({ classNames: [...new Set(allClassNames)], ids: [...new Set(allIds)] })
      );

      chrome.tabs.sendMessage(tabs[0].id, {
        action: "hideElements",
        classNames: classNames,
        ids: ids,
      });
    });
  });
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //apply changes
    const currentUrl = new URL(tabs[0].url).origin;
    const last = JSON.parse(localStorage.getItem(currentUrl)) || { classNames: [], ids: [] };
  
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "hideElements",
      classNames: last.classNames,
      ids: last.ids,
    });
  });
  