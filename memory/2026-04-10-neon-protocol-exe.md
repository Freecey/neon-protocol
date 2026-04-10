# 🎮 NEON PROTOCOL ⌬ - WINDOWS EXE BUILD GUIDE

**Date:** 2026-04-10  
**Version:** 3.0.0  
**Author:** Kyra ⌬

---

## 🚀 BUILD EXÉCUTABLE WINDOWS

### **Pourquoi Electron?**
- Transforme le jeu web (.html/.js) en vrai .exe Windows
- Portatif: pas besoin de Node.js sur le PC de JP
- Installation standard Windows (.msi via NSIS)
- 100MB (Electron + jeu)

---

## 📋 **COMMANDS BUILD**

### **1. Préparer**
```bash
cd ~/projects/rush-platformer
npm install
```
→ Installe Electron + dependencies

### **2. Build EXE**
```bash
npm run build:win
```
→ Crée `dist/NEON PROTOCOL Setup 3.0.0.exe`

### **3. Tester**
```bash
start dist/
# Double-clique sur Setup.exe
```

---

## 📁 **FICHIERS AJOUTÉS**

| Fichier | Purpose | Taille |
|---------|---------|--------|
| `src/electron/main.js` | Entrée Electron | ~1KB |
| `package.json` | Config Electron | ~1.3KB |
| `build-windows.bat` | Script build Windows | ~1KB |
| `BUILD-WINDOWS.md` | Guide build | ~1.4KB |

---

## 🎯 **PROCESSUS COMPLET**

1. **Développe** → Web (index.html + game.js)
2. **Build** → Electron → .exe
3. **Teste** → EXE sur Windows
4. **Distribue** → USB ou Cloud
5. **JP joue** → Double-clique → JOUEZ!

---

## 📊 **STATS BUILD**

- **Taille fichier:** ~100MB-120MB
- **Temps build:** 2-3 minutes
- **Compatibilité:** Windows 7+ (64-bit)
- **Format:** NSIS Installer (.exe)
- **Installation:** Standard Windows

---

## ⚙️ **CONFIGURATION**

**package.json build options:**
```json
{
  "build": {
    "appId": "com.kyra.neon-protocol",
    "productName": "NEON PROTOCOL",
    "win": {
      "target": "nsis",
      "icon": "public/icon.ico"
    },
    "files": ["src/electron/**/*", "index.html", "game.js"]
  }
}
```

**Options:**
- `nsis`: Créer shortcuts bureau/démarrer
- `oneClick: false`: Utilisateur choisit folder
- `icon`: Personnaliser icône app

---

## 🔧 **CUSTOMIZATION**

### **Icone personnalisée**
1. Crée `icon.ico` (256x256 ou 512x512)
2. Place dans `public/`
3. Build: `npm run build:win`

### **Version**
Modifie `package.json`:
```json
"version": "3.0.1"
```

### **Build spécifique**
```bash
# 64-bit
npm run build:win

# 32-bit
npm run build:win -- --ia32

# Toutes plateformes
npm run build
```

---

## 🎮 **POUR JP**

**Reçois le fichier:**
- USB clé
- Email
- Cloud (Dropbox, Google Drive)

**Installe:**
1. Double-clique `NEON PROTOCOL Setup 3.0.0.exe`
2. Suivre l'assistant (3 clics max)
3. JOUE! (pas de npm, pas de node, pas de PowerShell)

---

## ✅ **CHECKLIST**

- [x] Fichier `electron/main.js` créé
- [x] `package.json` mis à jour
- [x] Scripts build (`build-windows.bat`)
- [x] Guide (`BUILD-WINDOWS.md`)
- [x] README.md mis à jour
- [x] Instructions pour JP

---

## 📞 **SUPPORT**

**Si problème build:**
- `npm install --verbose` (voir logs)
- Nettoyer `node_modules/` + `package-lock.json`
- `npm install` + `npm run build:win`

**Besoin d'aide?**
- Email: hello@imkyra.be
- Discord: @freecey

---

**⌬ Kyra ⌬**  
_Build.exe pour JP • 2026-04-10_

**Lancer build maintenant?**
```bash
npm install && npm run build:win
```
