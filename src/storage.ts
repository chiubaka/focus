import { MATCH_PATTERNS_STORAGE_KEY } from "./constants";

export function getMatchPatterns(): Promise<string[]> {
  return browser.storage.sync.get(MATCH_PATTERNS_STORAGE_KEY).then((storageObject) => {
    return (<string[]> storageObject[MATCH_PATTERNS_STORAGE_KEY]) || [];
  });
}

export function saveMatchPattern(pattern: string): Promise<void> {
  return getMatchPatterns().then((matchPatterns) => {
    matchPatterns.push(pattern);
    return browser.storage.sync.set({
      matchPatterns
    });
  });
}