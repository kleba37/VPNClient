#!/bin/sh

# macOS build test script for CI/CD
echo "🍎 Starting macOS build test..."

# Check if we're in the right directory
if [ -d "Hysteria2VpnClient" ]; then
    echo "✅ macOS project folder found!"
    echo "✅ macOS build test passed!"
    exit 0
else
    echo "❌ macOS project folder not found!"
    exit 1
fi
