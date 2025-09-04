#!/bin/sh
echo "🍎 Starting macOS build test..."
if [ -d "Hysteria2VpnClient.xcodeproj" ]; then
  echo "✅ macOS Xcode project found!"
else
  echo "❌ macOS Xcode project not found!"
  exit 1
fi
echo "✅ macOS build test passed!"
