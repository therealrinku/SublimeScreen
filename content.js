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

function hideElementsByRoles(roles) {
  roles.forEach((role) => {
    const element = document.querySelector(`[role=${role}]`);
    if (element) {
      element.style.display = "none";
    }
  });
}

// this runs on current active tab
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { action, classNames, ids, roles } = request;

  if (action === "hideElements") {
    // const last = JSON.parse(localStorage.getItem("hiddenElements")) || { classNames: [], ids: [] };

    // const allClassNames = [...last.classNames, ...classNames].filter((item) => item);
    // const allIds = [...last.ids, ...ids].filter((item) => item);

    localStorage.setItem(
      "hiddenElements",
      JSON.stringify({ classNames: [...new Set(classNames)], ids: [...new Set(ids)], roles: [...new Set(roles)] })
    );

    console.log(`LOG: sublimate has cleaned up ${window.origin} Enjoy!`);
    hideElementsByClassName(classNames);
    hideElementsById(ids);
    hideElementsByRoles(roles);
  }
});
