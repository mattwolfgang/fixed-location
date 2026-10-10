const $ = (id) => document.getElementById(id);

// Each field's check returns an error message, or null if the value is valid.
const fields = {
  latitude: (n) => Math.abs(n) <= 90 ? null : "Latitude must be between -90 and 90",
  longitude: (n) => Math.abs(n) <= 180 ? null : "Longitude must be between -180 and 180",
  accuracy: (n) => n > 0 ? null : "Accuracy must be a positive number"
};

function showStatus(text, isError = false) {
  $("status").textContent = text;
  $("status").className = isError ? "error" : "";
}

chrome.storage.local.get(DEFAULTS).then((settings) => {
  $("enabled").checked = settings.enabled;
  for (const field in fields) $(field).value = settings[field];
});

$("enabled").addEventListener("change", () => {
  chrome.storage.local.set({ enabled: $("enabled").checked });
  showStatus($("enabled").checked ? "On" : "Off");
});

// Save valid values shortly after typing stops; invalid ones are flagged and not saved.
let saveTimer;
function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(save, 400);
}

function save() {
  const values = {};
  let error = null;
  for (const [field, check] of Object.entries(fields)) {
    const text = $(field).value.trim();
    const n = Number(text);
    const fieldError = text === "" || !isFinite(n) ? `${field[0].toUpperCase()}${field.slice(1)} must be a number` : check(n);
    $(field).classList.toggle("invalid", fieldError !== null);
    error ??= fieldError;
    values[field] = n;
  }
  if (error) return showStatus(error, true);
  chrome.storage.local.set(values);
  showStatus("Saved");
}

for (const field in fields) $(field).addEventListener("input", scheduleSave);

// Accept "lat, lon" pasted from a map into the latitude field.
$("latitude").addEventListener("paste", (event) => {
  const parts = event.clipboardData.getData("text").split(",").map((s) => s.trim());
  if (parts.length === 2 && parts.every((p) => p !== "" && !isNaN(p))) {
    event.preventDefault();
    [$("latitude").value, $("longitude").value] = parts;
    scheduleSave();
  }
});
