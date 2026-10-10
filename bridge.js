// Runs in the extension's isolated world, where chrome.storage is available,
// and forwards the settings to inject.js in the page's world.
function send(settings) {
  document.dispatchEvent(new CustomEvent("fixed-location:settings", {
    detail: JSON.stringify(settings)
  }));
}

chrome.storage.local.get(DEFAULTS).then(send);
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local") chrome.storage.local.get(DEFAULTS).then(send);
});
