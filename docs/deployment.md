# 📚 Guide de Déploiement - NEON PROTOCOL v5.4.7

## 🎯 Vue d'ensemble

Ce guide explique comment déployer NEON PROTOCOL v5.4.7 en production, que ce soit pour GitHub Pages, un serveur local, ou un hébergement personnalisé.

---

## 🚀 Déploiement GitHub Pages (Recommandé)

### Prérequis
- Repository GitHub: `https://github.com/Freecey/neon-protocol`
- Branche `gh-pages` créée
- GitHub Pages activé

### Activation GitHub Pages

1. Aller sur GitHub → Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: `gh-pages` (root `/`)
4. Save

**URL de déploiement:**
```
https://freecey.github.io/neon-protocol/
```

### Automatisé (script)

```bash
./deploy-gh-pages.sh
```

Ce script:
- Build le bundle avec esbuild
- Copie les fichiers dans la branche gh-pages
- Push sur origin

---

## 🔧 Build manuel

### 1. Bundle le jeu

```bash
cd /path/to/neon-protocol
npx esbuild game.js \
  --bundle \
  --outfile=public/game-bundle.js \
  --format=iife \
  --target=es2020 \
  --minify=false \
  --keep-names
```

**Options:**
- `--minify=true` pour production (déconseillé pour debug)
- `--target=es2020` → navigateurs modernes
- `--format=iife` → script auto-exécutable

### 2. Vérifier le build

```bash
ls -lh public/game-bundle.js
# Taille attendue: ~105 KB
```

---

## 🌐 Autres Hébergements

### ISPConfig (VPS)

1. Uploader les fichiers via FTP/SFTP:
   ```
   /var/www/clients/clientX/webY/
   ```

2. Configurer le vhost:
   ```apache
   DocumentRoot /var/www/clients/clientX/webY/
   <Directory /var/www/clients/clientX/webY>
     AllowOverride All
     Require all granted
   </Directory>
   ```

3. Redémarrer Apache:
   ```bash
   systemctl reload apache2
   ```

### Serveur local (nginx)

```nginx
server {
    listen 80;
    server_name platformer.local;
    root /var/www/neon-protocol;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

### Docker (optionnel)

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## ✅ Checklist de déploiement

- [ ] Build terminé sans erreur
- [ ] Bundle `public/game-bundle.js` présent
- [ ] Fichier `.nojekyll` ajouté
- [ ] `index.html` pointe vers `public/game-bundle.js`
- [ ] Branche `gh-pages` à jour
- [ ] GitHub Pages activé (si utilisé)
- [ ] URL live testée

---

## 🐛 Résolution de problèmes

### Erreur 404 sur GitHub Pages
- **Cause:** `index.html` pas à la racine de la branche
- **Fix:** Vérifier que `index.html` est au niveau supérieur de `gh-pages`

### Bundle non chargé
- **Cause:** `game-bundle.js` manquant ou corrompu
- **Fix:** Rebuild et re-push

### CORS erreur
- **Cause:**hébergement cross-origin sans headers
- **Fix:** Ajouter CORS headers sur le serveur

### Cache navigateur
- **Fix:** Hard refresh (Ctrl+Shift+R) ou Clear cache

---

## 🔄 Mise à jour de version

Pour déployer une nouvelle version:

```bash
# 1. Incrémenter version dans:
# - README.md
# - package.json

# 2. Commit sur main
git add .
git commit -m "chore: bump version to X.Y.Z"
git push origin main

# 3. Déployer
./deploy-gh-pages.sh
```

---

## 📊 Monitoring

### Vérifier le déploiement

```bash
# Test curl
curl -I https://freecey.github.io/neon-protocol/

# Doit retourner 200 OK
```

### Logs GitHub Pages

GitHub → Repository → Settings → Pages → View deployment

---

## 🎯 Rollback

Si le déploiement échoue:

```bash
# Revenir à un commit précédent sur gh-pages
git checkout gh-pages
git log --oneline  # trouver le bon commit
git reset --hard <commit-hash>
git push origin gh-pages --force
```

---

## 📞 Support

Pour tout problème de déploiement:
- Ouvrir une issue sur GitHub
- Contacter: hello@imkyra.be
- Discord: @freecey

---

**Dernière mise à jour:** 2026-04-11  
**Version:** NEON PROTOCOL v5.4.7  
**Statut:** ✅ Production Ready
