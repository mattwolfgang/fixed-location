#!/usr/bin/env bash
# Builds dist/fixed-location-<version>.zip for upload to the Chrome Web Store,
# containing only the files the extension needs at runtime.
set -euo pipefail
cd "$(dirname "$0")/.."

version=$(python3 -c 'import json; print(json.load(open("manifest.json"))["version"])')
out="dist/fixed-location-$version.zip"

mkdir -p dist
rm -f "$out"
zip -X -q "$out" manifest.json background.js bridge.js defaults.js inject.js \
  popup.html popup.js icons/icon-16.png icons/icon-32.png icons/icon-48.png \
  icons/icon-128.png LICENSE
echo "$out"
