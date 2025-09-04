#!/bin/sh

# Security check script for CI/CD
# This script checks for actual security vulnerabilities, not just outdated packages

echo "🔒 Checking for security vulnerabilities..."

# Check for actual security vulnerabilities
if npm audit --audit-level=moderate > /dev/null 2>&1; then
    echo "✅ No security vulnerabilities found!"
    echo "✅ Security check passed!"
    exit 0
else
    echo "❌ Security vulnerabilities found!"
    echo "🔍 Running detailed security audit..."
    npm audit --audit-level=moderate
    exit 1
fi
