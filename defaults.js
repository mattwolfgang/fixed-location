// Shared by the background worker, the popup and the isolated-world content script.
// Starts switched off with a placeholder location (Royal Observatory, Greenwich)
// until the user sets their own in the popup.
const DEFAULTS = {
  enabled: false,
  latitude: 51.4769,
  longitude: -0.0005,
  accuracy: 10
};
