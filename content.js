// content.js

function hideElementsByClassName(classNames) {
  classNames.forEach((className) => {
    const elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  });
}

function hideElementsById(ids) {
  ids.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = "none";
    }
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "hideElements") {
    hideElementsByClassName(request.classNames);
    hideElementsById(request.ids);
  }
});