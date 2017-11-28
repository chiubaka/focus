reloadMatchPatterns();

browser.storage.onChanged.addListener(function(changes, areaName) {
  var matchPatterns = changes.matchPatterns;
  if (matchPatterns) {
    addBlockListener(matchPatterns.newValue);
  }
});

function getMatchPatterns() {
  var storageItem = browser.storage.sync.get("matchPatterns");
  return storageItem.then(function(res) {
    return res.matchPatterns || [];
  });
}

function blockAndRedirect(requestDetails) {
  return {
    redirectUrl: "https://google.com"
  };
}

function reloadMatchPatterns() {
  getMatchPatterns().then(function(matchPatterns) {
    addBlockListener(matchPatterns);
  });
}

function removeBlockListener() {
  if (browser.webRequest.onBeforeRequest.hasListener(blockAndRedirect)) {
    browser.webRequest.onBeforeRequest.removeListener(blockAndRedirect);
  }
}

function addBlockListener(matchPatterns) {
  // Listeners are keyed by the function pointer provided here. Thus there's likely no need
  // to explicitly remove the existing listener here, since it should just be replaced.
  // This is done just to be safe, however, to avoid the possibility of a memory leak.
  removeBlockListener();
  browser.webRequest.onBeforeRequest.addListener(
    blockAndRedirect,
    {
      urls: matchPatterns,
      types: ["main_frame"]
    },
    ["blocking"]
  );
}