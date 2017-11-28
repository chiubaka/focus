var activeListener;
reloadMatchPatterns().then(function(listener) {
  activeListener = listener;
});

browser.storage.onChanged.addListener(function(changes, areaName) {
  console.log("Reloading in response to storage change.");
  browser.runtime.reload();
});

function getMatchPatterns() {
  var storageItem = browser.storage.sync.get("matchPatterns");
  return storageItem.then(function(res) {
    return res.matchPatterns || [];
  });
}

function blockAndRedirect(requestDetails) {
  console.log("Blocking " + requestDetails.url);
  return {
    redirectUrl: "https://google.com"
  };
}

function reloadMatchPatterns(listener) {
  return getMatchPatterns().then(function(matchPatterns) {
    console.log("Reloaded matchPatterns: " + matchPatterns);
    if (listener) {
      browser.webRequest.onBeforeRequest.removeListener(listener);
    }
    return browser.webRequest.onBeforeRequest.addListener(
      blockAndRedirect,
      {
        urls: matchPatterns,
        types: ["main_frame"]
      },
      ["blocking"]
    );
  });
}
