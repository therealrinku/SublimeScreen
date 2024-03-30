const supportedHosts = {
  "www.youtube.com": {
    name: "Youtube",
    modes: {
      default: {
        hiddenClassNames: [],
        hiddenIds: [],
      },
      clean: {
        hiddenClassNames: [""],
        hiddenIds: ["secondary"],
      },
      minimal: {
        hiddenClassNames: [""],
        hiddenIds: ["secondary"],
      },
    },
  },
  "www.facebook.com": {
    name: "Facebook",
  },
};

document.addEventListener("DOMContentLoaded", function () {
  const currentPageText = document.querySelector(".current-page");
  const modesDivNode = document.querySelector(".modes");

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const hostName = new URL(tabs[0].url).host;

    const info = supportedHosts[hostName];

    if (!info) {
      currentPageText.innerHTML = "Unsupported Site.";
      return;
    }

    currentPageText.innerHTML = info.name;

    // modes
    Object.entries(info.modes).forEach((mode) => {
      const wrapper = document.createElement("div");
      const radioElem = document.createElement("input");
      const label = document.createElement("label");

      radioElem.type = "radio";
      radioElem.name = hostName;
      radioElem.defaultChecked = mode[0] === "default";
      radioElem.id = `${hostName}-${mode[0]}`;
      radioElem.value = `${hostName}-${mode[0]}`;
      radioElem.addEventListener("click", function (e) {
        console.log(e.target.checked, "checked");
        const [host, mode] = e.target.value.split("-");

        const { hiddenClassNames, hiddenIds } = supportedHosts[host].modes[mode];

        chrome.tabs.sendMessage(tabs[0].id, {
          action: "hideElements",
          classNames: hiddenClassNames,
          ids: hiddenIds,
        });
      });
      label.innerText = mode[0];
      label.htmlFor = `${hostName}-${mode[0]}`;
      wrapper.appendChild(radioElem);
      wrapper.appendChild(label);

      modesDivNode.appendChild(wrapper);
    });
  });

  // document.getElementById("hideElementsBtn").addEventListener("click", function () {
  //   const classNames = document
  //     .getElementById("classNames")
  //     .value.split(",")
  //     .map((className) => className.trim());

  //   const ids = document
  //     .getElementById("ids")
  //     .value.split(",")
  //     .map((id) => id.trim());

  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     chrome.tabs.sendMessage(tabs[0].id, {
  //       action: "hideElements",
  //       classNames: classNames,
  //       ids: ids,
  //     });
  //   });
  // });
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
