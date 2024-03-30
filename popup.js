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
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "hideElements",
        classNames: classNames,
        ids: ids,
      });
    });
  });
});

function hideElementsByClassName(classNames) {
  if (!Array.isArray(classNames)) {
    return;
  }

  classNames.forEach((className) => {
    const elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  });
}

function hideElementsById(ids) {
  if (!Array.isArray(ids)) {
    return;
  }

  ids.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = "none";
    }
  });
}

// execute the code on the tab to hide the last selected elements
const last = JSON.parse(localStorage.getItem("hiddenElements")) || { classNames: [], ids: [] };
hideElementsByClassName(last.classNames);
hideElementsById(last.ids);
console.log(`LOG: sublimate has cleaned up ${window.origin}. Enjoy!`);
