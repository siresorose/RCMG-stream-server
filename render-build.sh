#!/bin/bash
set -euo pipefail

# System dependencies
sudo apt-get update
sudo apt-get install -y ffmpeg

# Node dependencies
npm ci --only=production
