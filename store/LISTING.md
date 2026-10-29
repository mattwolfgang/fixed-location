# Chrome Web Store submission

Text and answers to paste into the Developer Dashboard
(https://chrome.google.com/webstore/devconsole). Build the upload with
`scripts/package.sh`.

## Store listing tab

**Name:** Fixed Location (from the manifest)

**Summary:** from the manifest description.

**Category:** Make Chrome Yours > Functionality & UI

**Language:** English

**Description:**

```
Fixed Location lets you tell your browser where you are, for computers that have no other way to find out.

Desktop computers and most laptops have no GPS. Browsers usually work out their location by looking up nearby Wi-Fi networks in a database. That fails in rural and remote places where the only network in range is your own: there is nothing to look up, so maps, weather, store finders and other sites can't locate you, or put you hundreds of miles away.

With Fixed Location you enter your coordinates once, and when a site asks the browser for your location it gets the one you set.

HOW TO USE
1. Click the toolbar icon.
2. Enter your latitude and longitude. You can paste "lat, lon" copied from a map into the Latitude field to fill both.
3. Switch on "Use fixed location". The icon shows ON while it is active.

Switch it off and sites get the browser's normal location again.

PRIVACY
Your location is stored only in your browser on your own device. The extension sends nothing to the developer or anyone else, and has no analytics or tracking. Websites receive the location only when they ask for it through the browser's Geolocation API, as they would without the extension.

LIMITS
It only changes what the browser's Geolocation API reports. Sites that estimate your location from your IP address on their own servers aren't affected.

Open source: https://github.com/mattwolfgang/fixed-location
```

**Graphic assets:**

- Store icon (128x128): `icons/icon-128.png`
- Screenshot (1280x800): `store/screenshot-1280x800.png`
- Small promo tile (440x280): `store/promo-tile-440x280.png`

**Homepage URL:** https://github.com/mattwolfgang/fixed-location

**Support URL:** https://github.com/mattwolfgang/fixed-location/issues

## Privacy practices tab

**Single purpose:**

```
Lets the user set a fixed location by hand, which the browser then reports to websites through the Geolocation API. It is for computers without GPS in places where Wi-Fi positioning can't determine the location.
```

**Justification for `storage`:**

```
Saves the latitude, longitude and accuracy the user enters, and whether the fixed location is switched on, so the setting persists between browser sessions. Stored locally only.
```

**Justification for host permission (content scripts on all URLs):**

```
Websites ask for location through navigator.geolocation in the page itself, and the user can't know in advance which sites will ask (maps, weather, store locators, delivery services, etc.). The content script must run on every page so it can answer those requests with the user's chosen location. It doesn't read or change page content, and when the extension is switched off it passes every request to the browser's own Geolocation API unchanged.
```

**Remote code:** No, I am not using remote code.

**Data usage:** tick **Location**. The extension handles location data the
user enters and provides it to the websites the user visits that request it.
It does not send it anywhere else. Tick all three certifications (not sold to
third parties, not used for unrelated purposes, not used for credit).

**Privacy policy URL:**
https://github.com/mattwolfgang/fixed-location/blob/main/PRIVACY.md

## Distribution tab

Visibility: Public. Regions: all.
