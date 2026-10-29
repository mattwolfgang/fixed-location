# Fixed Location

A Chrome/Brave extension that reports a fixed, manually set location to
websites that use the browser's Geolocation API.

It's for computers without GPS in places where Wi-Fi positioning doesn't work,
such as a rural home where the only Wi-Fi network in range is your own. With
nothing to look up, the browser can't find your location, or gets it badly
wrong.

## Install

To install from source:

1. Open `brave://extensions` and turn on **Developer mode**.
2. Click **Load unpacked** and select this directory.
3. Pin the extension. The icon shows **ON** while the fixed location is active.

## Use

Click the icon, enter your coordinates, and flip the switch on. It starts off,
with a placeholder location in Greenwich, until you set your own. Changes save
automatically. You can paste `lat, lon` from a map into the Latitude field to
fill both fields.

When it's off, sites get the browser's normal location.

## Limits

- It only changes what the Geolocation API reports. Sites that guess your
  location from your IP address on their server aren't affected.
- It doesn't apply on pages where extensions can't run, such as `brave://` pages
  and the Chrome Web Store.

## Privacy

Settings stay in your browser and nothing is sent anywhere. See
[PRIVACY.md](PRIVACY.md).

## Publishing

`scripts/package.sh` builds `dist/fixed-location-<version>.zip` for upload to
the Chrome Web Store. Bump `version` in `manifest.json` for each new upload.
The listing text, privacy answers and images are in [store/](store/).

## License

MIT. See [LICENSE](LICENSE).
