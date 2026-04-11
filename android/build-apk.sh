#!/bin/bash
# 📱 BUILD APK FOR ANDROID - NEON PROTOCOL
# Script pour build APK Android à partir du web game

set -e

echo "🚀 BUILDING NEON PROTOCOL APK..."

# Check Android SDK
if ! command -v android &> /dev/null; then
    echo "❌ Android SDK not found!"
    echo "👉 Install JDK 8+ first (https://adoptium.net/)"
    echo "👉 Then install Android SDK (https://developer.android.com/studio)"
    exit 1
fi

# Check Cordova/Capacitor
if ! command -v cordova &> /dev/null && ! command -v npx capacitor &> /dev/null; then
    echo "⚠️ Cordova/Capacitor not installed, installing..."
    npm install -g cordova
fi

# Create Android project
mkdir -p android/app
cd android/app

# Initialize Cordova project
if [ ! -d "www" ]; then
    echo "📁 Creating Cordova project structure..."
    cordova create neon-protocol com.nean.kyra "NEON PROTOCOL"
    cd neon-protocol
    
    # Add Android platform
    cordova platform add android
    
    # Copy web files
    echo "📦 Copying web files to Android..."
    cp -r ../../index.html ../../game.js ../../src ../../public ./www/
    
    # Update www/config.xml for Android
    cat > ./www/config.xml << 'EOF'
<?xml version='1.0' encoding='utf-8'?>
<widget version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <id>com.nean.kyra</id>
    <name>NEON PROTOCOL</name>
    <description>Platformer game with Boss battles & Power-ups</description>
    <author email="hello@imkyra.be" href="https://imkyra.be">Kyra ⌬</author>
    
    <content src="index.html" />
    
    <access origin="*" />
    
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    
    <platform name="android">
        <allow-intent href="market:*" />
        <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/application">
            <application android:hardwareAccelerated="true" android:theme="@android:style/Theme.NoTitleCard" />
        </edit-config>
        <preference name="android-minSdkVersion" value="21" />
        <preference name="android-targetSdkVersion" value="33" />
    </platform>
    
    <!-- Mobile touch support -->
    <feature name="GestureHandler">
        <param name="android-package" value="org.apache.cordova.gesturehandler" />
    </feature>
</widget>
EOF
    
    # Build APK
    echo "🔨 Building APK..."
    cordova build android --release
    
    echo "✅ APK BUILD SUCCESSFUL!"
    echo "📁 APK location: platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk"
    
else
    echo "⚠️ Android project already exists, updating..."
    # Update files if needed
    cordova build android --release
fi

cd ../..

echo "🎮 NEON PROTOCOL ANDROID APK READY!"
