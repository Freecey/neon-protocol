# ⚠️ Problèmes Connus - NEON PROTOCOL v5.4.7

*Liste des bugs non-critiques et limitations connues.*

---

## 🐛 Bugs non-critiques (Low Priority)

### 1. Duplicate case in ParticleSystem2

**Sévérité:** ⚠️ Warning (non-bloquant)  
**Fichier:** `src/systems/ParticleSystem2.js:348 & 358`  
**Description:** Deux cas `'levelup'` identiques détectés par ESLint.

**Impact:**
- ✅ Le second cas n'est jamais exécuté (le premier le capture)
- ✅ Fonctionnel, mais code mort présent

**Fix prévue:** Nettoyage dans v5.4.8

---

### 2. AudioContext requires user interaction

**Sévérité:** ℹ️ Info (comportement navigateur)  
**Symptôme:** L'audio ne démarre pas sans interaction utilisateur.

**Cause:** Politique autoplay des navigateurs modernes.

**Workaround:** L'utilisateur doit cliquer sur "Commencer" (déjà implémenté).

**Status:** ✅ Fonctionnel, pas de fix nécessaire.

---

### 3. localStorage peut être plein

**Sévérité:** ⚠️ Moyen (edge case)  
**Fichier:** `src/systems/LocalStorageSystem.js` (si existe) ou autres

**Symptôme:** Erreur `QuotaExceededError` sur 60 secondes de jeu intensif.

**Protection:** Ajouté en v5.4.6/5.4.7 avec try/catch.

**Impact résiduel:**
- Leaderboard ne sauvegarde pas si quota plein
- Achievements peuvent perdre la progression

**Workaround:**Effacer le localStorage du navigateur (F12 → Application → Clear).

**Fix prévue:** Compression des données + fallback in-memory.

---

### 4. Resize canvas sur écrans haute densité

**Sévérité:** ⚠️ Mineur (visuel)  
**Symptôme:** Canvas flou sur écran Retina/4K après resize.

**Cause:** DPR (Device Pixel Ratio) non recalculé dynamiquement.

**Fix:** Recalcul DPR dans `resizeCanvas()` (prévu v5.4.8).

**Workaround:** Recharger la page (F5).

---

### 5. Mobile: swipe detection sur certains devices

**Sévérité:** ⚠️ Mineur (mobile uniquement)  
**Symptôme:** Swipe gauche/droite non détecté sur certains navigateurs mobiles.

**Cause:** `touchstart`/`touchmove` mal calibré pour certains viewports.

**Status:** ✅ Partiellement fixé en v5.4.5  
**Testé sur:** Chrome Android, Safari iOS

**Workaround:** Utiliser les boutons tactiles à l'écran.

---

## 🎮 Limitations connues

### Pas de son en arrière-plan (iOS Safari)

iOS Safari coupe l'audio quand l'onglet est inactif. Aucune solution sans Web Audio API + unlock (déjà implémenté).

### Pas de mode hors-ligne (PWA)

Le jeu nécessite une connexion pour charger le bundle la première fois. Pas de service worker implémenté.

### Pas de sauvegarde cloud

Les données localStorage sont locales à l'appareil. Pas de sync entre devices.

### Taille du bundle

105 KB (non-minifié) — acceptable mais pourrait être optimisé avec minification + gzip.

---

## 📋 Checklist de tests

Chaque release doit être testée sur:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (macOS + iOS)
- [ ] Edge (Windows)
- [ ] Chrome Android
- [ ] Safari iOS
- [ ] Firefox Android

---

## 🎯 Priorité des fixes

| Issue | Priorité | Version cible |
|-------|----------|---------------|
| Duplicate case cleanup | Basse | v5.4.8 |
| DPR resize fix | Moyenne | v5.4.8 |
| localStorage compression | Haute | v5.5.0 |
| Service Worker (offline) | Moyenne | v6.0.0 |
| Cloud save | Basse | v6.1.0 |

---

## 💬 Comment reporter un bug

1. Capturer une screenshot/log de console (F12)
2. Décrire les étapes pour reproduire
3. Spécifier: OS, navigateur, version
4. Ouvrir une issue sur GitHub: https://github.com/Freecey/neon-protocol/issues

---

**Dernière mise à jour:** 2026-04-11  
**Version:** NEON PROTOCOL v5.4.7  
**Maintained by:** Kyra ⌬
