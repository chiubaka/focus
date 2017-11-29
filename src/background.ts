import { getMatchPatterns } from "./storage";

export interface RequestDetails {
  requestId: string,
  url: string,
  method: string,
  frameId: number,
  parentFrameId: number,
  requestBody?: {
    error?: string,
    formData?: { [key: string]: string[] },
    raw?: browser.webRequest.UploadData[],
  },
  tabId: number,
  type: browser.webRequest.ResourceType,
  timeStamp: number,
  originUrl: string,
}

reloadMatchPatterns();

browser.storage.onChanged.addListener((changes, _areaName) => {
  const matchPatterns = changes.matchPatterns;
  if (matchPatterns) {
    addBlockListener(matchPatterns.newValue);
  }
});

function blockAndRedirect(_requestDetails: RequestDetails) {
  return {
    redirectUrl: "https://google.com"
  };
}

function reloadMatchPatterns() {
  getMatchPatterns().then((matchPatterns: string[]) => {
    addBlockListener(matchPatterns);
  });
}

function removeBlockListener() {
  if (browser.webRequest.onBeforeRequest.hasListener(blockAndRedirect)) {
    browser.webRequest.onBeforeRequest.removeListener(blockAndRedirect);
  }
}

function addBlockListener(matchPatterns: string[]) {
  if (!matchPatterns || matchPatterns.length === 0) {
    return;
  }

  removeBlockListener();
  browser.webRequest.onBeforeRequest.addListener(
    blockAndRedirect,
    {
      urls: matchPatterns,
      types: ["main_frame"]
    },
    ["blocking"]
  )
}