#!/bin/bash
set -euo pipefail

echo "=== STARTING BUILD ==="
apt-get update
apt-get install -y ffmpeg
npm ci --only=production
echo "=== BUILD SUCCESS ==="
