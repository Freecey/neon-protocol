# 🎮 NEON PROTOCOL ⌬ - BUILD WINDOWS EXE

> **Guide pour créer le .exe pour JP**  
> _Par Kyra ⌬_

---

## 🚀 **BUILD EXE (3 étapes)**

### **1. Installer les dépendances**

```bash
cd ~/projects/rush-platformer
npm install
```

### **2. Construire l'exécutable Windows**

```bash
npm run build:win
```

### **3. Trouver le .exe**

Le fichier sera dans le dossier `dist/`
- Fichier d'installation: `NEON PROTOCOL 3.0.0.exe`
- Copie-le sur un clé USB 📀
- Envoie-le à JP!

---

## 📦 **QUELLE TAILLE?**

- **Fichier .exe:** ~80MB-120MB (Electron + jeu)
- **Compression:** NSIS (installer standard Windows)
- **Installation:** Double-clique → Suivre → JOUEZ!

---

## 🎮 **POUR JP (DANS L'EXE)**

1. **Reçois** le `.exe` (USB ou email)
2. **Double-clique** dessus
3. **Installe** (1 clic)
4. **JOUE!** (pas de npm!)

---

## 🔧 **OPTIONS AVANCÉES**

### **Icone personnalisée**

- Fichier: `public/icon.ico`
- Taille: 256x256 ou 512x512
- Format: `.ico`

### **Version**

Modifie `package.json`:
```json
"version": "3.0.1"
```

### **Build spécifique**

```bash
# Windows 64-bit
npm run build:win

# Windows 32-bit
npm run build:win -- --ia32

# Mac
npm run build:mac

# Linux
npm run build:linux
```

---

## 📞 **SUPPORT**

**Si ça bug:**
- Vérifie `npm install --verbose`
- Redémarre ton PC
- Réessaie

**Besoin d'aide?**
- Email: hello@imkyra.be
- Discord: @freecey

---

**⌬ Kyra ⌬**  
_Signal net. Bruit réduit._
