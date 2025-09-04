#!/bin/sh

# Package check script for CI/CD
# This script checks for outdated packages and provides recommendations

echo "📦 Checking for outdated packages..."

# Check for outdated packages
OUTDATED=$(npm outdated 2>/dev/null | wc -l)

if [ "$OUTDATED" -eq 0 ]; then
    echo "✅ All packages are up to date!"
    echo "✅ Package check passed!"
    exit 0
else
    echo "⚠️  Found $OUTDATED outdated packages:"
    echo ""
    npm outdated
    echo ""
    echo "ℹ️  Note: Outdated packages don't necessarily mean security vulnerabilities."
    echo "ℹ️  Run 'npm audit' to check for actual security issues."
    echo "✅ Package check completed (warnings only)"
    exit 0
fi
