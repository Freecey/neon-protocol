#!/bin/bash
# 📱 BUILD MOBILE APK/IPA - NEON PROTOCOL
# Script complet pour build APK Android et iOS

set -e

echo "🚀 BUILDING MOBILE VERSIONS FOR NEON PROTOCOL"
echo "============================================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found!"
    exit 1
fi

# Capacitor setup
echo "📦 Installing Capacitor..."
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios @capacitor/status-bar

# Create Capacitor project
echo "📁 Initializing Capacitor project..."
npx cap init "NEON PROTOCOL" "com.nean.kyra"

# Copy web files
echo "📦 Copying game files to web directory..."
mkdir -p www
cp index.html www/
cp game.js www/
cp -r src www/

# Update package.json
echo "🔧 Updating package.json..."
# Add Capacitor scripts to package.json
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts = {
  ...pkg.scripts,
  'cap:android': 'npx cap add android',
  'cap:ios': 'npx cap add ios',
  'cap:sync': 'npx cap sync',
  'cap:open:android': 'npx cap open android',
  'cap:open:ios': 'npx cap open ios'
};
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

# Add Android platform
echo "🤖 Adding Android platform..."
npm run cap:add android || echo "⚠️ Android platform might already exist"

# Build Android APK
echo "🔨 Building Android APK..."
npm run cap:sync
npx cap run android --target=android --device

# Build iOS (optional)
# echo "🍎 Adding iOS platform..."
# npm run cap:add ios || echo "⚠️ iOS platform might already exist"

echo "✅ BUILD COMPLETE!"
echo "📱 APK location: platforms/android/app/build/outputs/apk/debug/app-debug.apk"
echo "🎮 Install on Android device: adb install platforms/android/app/build/outputs/apk/debug/app-debug.apk"
