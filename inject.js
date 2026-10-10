// Runs in the page's own world before any page script, and replaces the
// Geolocation API so it reports the location set in the popup.
(() => {
  const proto = Geolocation.prototype;
  const nativeGet = proto.getCurrentPosition;
  const nativeWatch = proto.watchPosition;
  const nativeClear = proto.clearWatch;
  const nativeQuery = Permissions.prototype.query;

  // Settings arrive asynchronously from bridge.js. Calls made before then wait,
  // which is invisible to pages because geolocation callbacks are async anyway.
  let settings = null;
  let resolveReady;
  const ready = new Promise((resolve) => { resolveReady = resolve; });
  document.addEventListener("fixed-location:settings", (event) => {
    settings = JSON.parse(event.detail);
    resolveReady();
  });

  function makePosition() {
    const coords = Object.create(GeolocationCoordinates.prototype);
    const values = {
      latitude: settings.latitude,
      longitude: settings.longitude,
      accuracy: settings.accuracy,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null
    };
    for (const [key, value] of Object.entries(values)) {
      Object.defineProperty(coords, key, { value, enumerable: true });
    }
    Object.defineProperty(coords, "toJSON", { value: () => ({ ...values }) });

    const position = Object.create(GeolocationPosition.prototype);
    const timestamp = Date.now();
    Object.defineProperty(position, "coords", { value: coords, enumerable: true });
    Object.defineProperty(position, "timestamp", { value: timestamp, enumerable: true });
    Object.defineProperty(position, "toJSON", {
      value: () => ({ coords: coords.toJSON(), timestamp })
    });
    return position;
  }

  proto.getCurrentPosition = function (success, error, options) {
    ready.then(() => {
      if (settings.enabled) success(makePosition());
      else nativeGet.call(this, success, error, options);
    });
  };

  // Our watch ids count down from -1 so they never collide with native ids.
  let nextWatchId = -1;
  const watches = new Map();

  proto.watchPosition = function (success, error, options) {
    const id = nextWatchId--;
    watches.set(id, null);
    ready.then(() => {
      if (!watches.has(id)) return;
      if (settings.enabled) success(makePosition());
      else watches.set(id, nativeWatch.call(this, success, error, options));
    });
    return id;
  };

  proto.clearWatch = function (id) {
    if (watches.has(id)) {
      const nativeId = watches.get(id);
      watches.delete(id);
      if (nativeId !== null) nativeClear.call(this, nativeId);
    } else {
      nativeClear.call(this, id);
    }
  };

  // Sites often check the permission first and skip asking if it isn't granted.
  Permissions.prototype.query = async function (descriptor) {
    const status = await nativeQuery.call(this, descriptor);
    await ready;
    if (descriptor && descriptor.name === "geolocation" && settings.enabled) {
      Object.defineProperty(status, "state", { value: "granted", configurable: true });
    }
    return status;
  };
})();
