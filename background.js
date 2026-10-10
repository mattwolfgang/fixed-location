importScripts("defaults.js");

// Show "ON" on the toolbar icon while the fixed location is active, so it's
// obvious when travelling that websites aren't seeing the real location.
async function updateBadge() {
  const { enabled } = await chrome.storage.local.get(DEFAULTS);
  await chrome.action.setBadgeBackgroundColor({ color: "#2e7d32" });
  await chrome.action.setBadgeText({ text: enabled ? "ON" : "" });
}

chrome.runtime.onInstalled.addListener(updateBadge);
chrome.runtime.onStartup.addListener(updateBadge);
chrome.storage.onChanged.addListener(updateBadge);
