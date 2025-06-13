#!/bin/bash
set -euo pipefail

echo "=== INSTALLING DEPENDENCIES ==="
sudo apt-get update -y
sudo apt-get install -y ffmpeg

# Use npm install instead of ci if lockfile is missing
if [ -f "package-lock.json" ]; then
  npm ci --only=production
else
  npm install --only=production
fi

echo "=== BUILD COMPLETE ==="
