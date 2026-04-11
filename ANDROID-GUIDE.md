# 📱 NEON PROTOCOL - BUILD ANDROID APK

**Date:** 2026-04-11  
**Version:** v5.3  
**Author:** Kyra ⌬

---

## 👋 **BONJOUR!**

Ce guide t'aide à builder **NEON PROTOCOL** sur **Android** (APK) et **iOS** (IPA).

---

## 🚀 **MÉTHODE 1: CAPACITOR (RECOMMANDÉ)**

### **Prérequis:**
- ✅ Node.js ≥ 16
- ✅ npm ≥ 7
- ✅ Android Studio (optionnel, pour émulateur)
- ✅ Xcode (pour iOS Mac uniquement)

### **Étapes:**

#### **1. Installer Capacitor**
```bash
cd ~/projects/rush-platformer
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
```

#### **2. Initialiser le projet**
```bash
npx cap init "NEON PROTOCOL" "com.nean.kyra"
```

#### **3. Ajouter plateforme Android**
```bash
npx cap add android
```

#### **4. Sync web files**
Ce script copie `index.html`, `game.js`, `src/`, etc. vers le projet Capacitor.

```bash
npm run cap:sync
```

#### **5. Build APK**
```bash
npx cap run android
```

**Résultat:** 
- APK Debug: `platforms/android/app/build/outputs/apk/debug/app-debug.apk`
- APK Release: `platforms/android/app/build/outputs/apk/release/app-release.apk`

#### **6. Installer sur Android**
```bash
# Via ADB
adb install platforms/android/app/build/outputs/apk/debug/app-debug.apk

# Via émulateur (lancé par npx cap run android)
```

---

## 📱 **MÉTHODE 2: CORDOVA**

### **Prérequis:**
- ✅ JDK 8+ (https://adoptium.net/)
- ✅ Android SDK
- ✅ Apache Cordova

### **Étapes:**

#### **1. Installer Cordova**
```bash
npm install -g cordova
```

#### **2. Créer projet**
```bash
cordova create neon-protocol com.nean.kyra "NEON PROTOCOL"
cd neon-protocol
```

#### **3. Ajouter plateforme Android**
```bash
cordova platform add android
```

#### **4. Copier web files**
```bash
# Dans le dossier racine NEON PROTOCOL
cp index.html neon-protocol/www/
cp game.js neon-protocol/www/
cp -r src neon-protocol/www/
```

#### **5. Build APK**
```bash
cordova build android --release
```

**Résultat:**
- `neon-protocol/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk`

#### **6. Signer l'APK (pour publication)**
Voir guide de signature Android: https://developer.android.com/studio/publish/app-signing

---

## 🎮 **FEATURES MOBILE INTÉGRÉES**

### **Contrôles Tactiles:**
- ⬅️➡️ **Gauche/Droite** - Tap ou swipe horizontal
- ⬆️ **Saut** - Tap ou swipe vertical
- ⬇️ **Chute rapide** - Swipe bas

### **Support Multi-touch:**
- 2 doigts: Joystick + Saut
- Responsive design
- Boutons tactiles si tablette

### **Responsive:**
- Canvas adaptatif
- UI scalable
- Orientation portrait/landscape

---

## 🔧 **SCRIPTS UTILISABLES**

### **Build APK Automatique**
```bash
chmod +x build-mobile.sh
./build-mobile.sh
```

### **Build Android via Cordova**
```bash
chmod +x android/build-apk.sh
./android/build-apk.sh
```

---

## 📦 **APK VS EXE**

| Feature | APK | EXE |
|---------|-----|-----|
| **Platform** | Android | Windows |
| **Size** | ~15-20MB | ~100-120MB |
| **Install** | Google Play ou APK direct | Installer (.exe) |
| **Controls** | Tactile + Clavier | Clavier/Souris |
| **Performance** | Native Android | Electron (Web) |
| **Update** | Google Play auto | Manuel |

---

## 🌐 **PUBLICATION**

### **Google Play:**
1. Signer APK (keystore)
2. Créer compte développeur ($25 one-time)
3. Soumettre APK + screenshots + description
4. Attendre review (1-3 jours)

### **Distribution directe:**
- Héberger APK sur GitHub
- Lien direct: https://github.com/Freecey/neon-protocol/releases
- Scanner QR pour installer
- APK signature: Debug (test) ou Release (prod)

---

## ✅ **CHECKLIST**

- [ ] Capacitor/Cordova installé
- [ ] Projet initialisé
- [ ] Plateforme Android ajoutée
- [ ] Web files copiés
- [ ] APK buildé avec succès
- [ ] Testé sur émulateur/device
- [ ] Signé (pour pub)
- [ ] Publié (Google Play or direct)

---

## 🎯 **VERSION ACTUELLE**

**Game:** v5.2 (COMPLETE)  
**Mobile:** v5.3 (APK support)  
**Status:** ✅ Prêt build

---

**Kyra ⌬ - Guide Android**  
_Signal net. Bruit réduit._

**🎮 JOUE SUR ANDROID MAINTENANT!**

**📱 APK PRÊT!**

---

*NEON PROTOCOL v5.3 - Build APK/iOS*
