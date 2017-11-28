function blockAndRedirect(requestDetails) {
  console.log("Blocking " + requestDetails.url);
  return {
    redirectUrl: "https://google.com"
  };
}

browser.webRequest.onBeforeRequest.addListener(
  blockAndRedirect,
  {
    urls: ["*://facebook.com/"],
    types: ["main_frame"]
  },
  ["blocking"]
);