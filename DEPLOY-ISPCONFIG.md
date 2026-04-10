# 🚀 DÉPLOIEMENT RUSH PLATFORMER SUR ISPCONFIG

**Date:** 2026-04-10  
**Server:** cloud1.neant.be (ISPConfig)  
**Domain:** platformer.kyralab.be

---

## 📋 PRÉREQUIS

### 1. **Accès SSH à ISPConfig**
```bash
ssh cedric@cloud1.neant.be
# Mot de passe: [à demander à Cey]
```

### 2. **Droits requis:**
- utilisateur `www-data` ou `cedric` avec sudo NOPASSWD
- accès au dossier `/var/www`
- API ISPConfig configurée

---

## 🎯 ÉTAPES DE DÉPLOIEMENT

### **Étape 1: Préparer le serveur**

```bash
# Se connecter
ssh cedric@cloud1.neant.be

# Créer le dossier du projet
sudo mkdir -p /var/www/platformer.kyralab.be
cd /var/www/platformer.kyralab.be

# Cloner ou transférer le code
# Option A: Git
sudo git clone [ton-repo-github] .
# Option B: SCP depuis localhost
scp -r ~/projects/rush-platformer/* cedric@cloud1.neant.be:/var/www/platformer.kyralab.be/

# Installer PHP 8.x et extensions
sudo apt update
sudo apt install -y php8.2 php8.2-cli php8.2-fpm php8.2-mysql php8.2-zip php8.2-gd

# Installer Node.js pour serve static (si besoin)
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs

# Installer Git
sudo apt install -y git
```

---

### **Étape 2: Configuration Nginx**

Créer le fichier de configuration:

```bash
sudo nano /etc/nginx/sites-available/platformer.kyralab.be
```

**Contenu:**
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name platformer.kyralab.be www.platformer.kyralab.be;
    
    root /var/www/platformer.kyralab.be;
    index index.html index.htm;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Enable caching for static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # Disable caching for HTML
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires 0;
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/x-javascript application/xml application/json;
    
    # Error pages
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /var/www/platformer.kyralab.be;
    }
    
    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
    
    # Deny access to backup files
    location ~* $ \.(bak|config|sql|fla|psd|ini|log|sh|inc|swp|dist)$ {
        deny all;
    }
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Activer le site:
```bash
sudo ln -s /etc/nginx/sites-available/platformer.kyralab.be /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### **Étape 3: Configuration SSL (Let's Encrypt)**

```bash
# Installer Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtenir le certificat SSL
sudo certbot --nginx -d platformer.kyralab.be -d www.platformer.kyralab.be

# Réessayer si besoin (suivre l'assistant)
```

---

### **Étape 4: Créer le site ISPConfig**

Via l'interface web ISPConfig (`https://cloud1.neant.be:81`):

1. **Login:** ton user ISPConfig
2. **Aller à:** Sites → Websites
3. **Créer un nouveau site:**
   - **Domain:** `platformer.kyralab.be`
   - **Type:** Primary Site
   - **PHP Mode:** PHP-FPM
   - **PHP Version:** 8.2
   - **Web Directory:** `/var/www/platformer.kyralab.be`
   - **Subdomain:** NON
   - **Alias:** `www.platformer.kyralab.be`
   - **SSL:** Activer SSL et installer certificat (automatique avec Certbot)

4. **Sauvegarder**

---

### **Étape 5: Permissions et ownership**

```bash
# Changer l'ownership
sudo chown -R www-data:www-data /var/www/platformer.kyralab.be

# Permissions sécurisées
sudo chmod -R 755 /var/www/platformer.kyralab.be
sudo chmod 644 /var/www/platformer.kyralab.be/index.html
sudo find /var/www/platformer.kyralab.be -type f -exec chmod 644 {} \;
sudo find /var/www/platformer.kyralab.be -type d -exec chmod 755 {} \;

# Si nécessaire (pour upload futur)
sudo chmod -R 770 /var/www/platformer.kyralab.be/uploads
```

---

### **Étape 6: Tester le déploiement**

```bash
# Tester Nginx
sudo nginx -t

# Vérifier SSL
sudo certbot certificates

# Tester l'accès
curl -I https://platformer.kyralab.be
```

---

### **Étape 7: Firewall (si nécessaire)**

```bash
# Autoriser HTTPS
sudo ufw allow 'Nginx Full'
sudo ufw allow 'Nginx HTTP'

# Vérifier
sudo ufw status
```

---

## 🔄 MISES À JOUR FUTURES

Pour déployer de nouvelles versions:

```bash
# Option 1: SSH git pull
ssh cedric@cloud1.neant.be
cd /var/www/platformer.kyralab.be
sudo git pull origin main

# Option 2: SCP fichier
scp index.html cedric@cloud1.neant.be:/var/www/platformer.kyralab.be/
```

---

## ✅ CHECKLIST FINALE

### Avant HTTPS:
- [ ] Site ISPConfig créé
- [ ] DNS configuré (`platformer.kyralab.be` → cloud1.neant.be)
- [ ] Nginx configuré
- [ ] Certificat SSL obtenu
- [ ] Permissions correctes
- [ ] Firewall configuré

### Post-déploiement:
- [ ] Test http://platformer.kyralab.be
- [ ] Test https://platformer.kyralab.be
- [ ] Test HTTPS redirect
- [ ] Test sur mobile
- [ ] Test performance (PageSpeed)

---

## 🎨 PERSONNALISATION KYRA

Le jeu est maintenant configuré avec:
- ✅ Couleurs cyan #00bcd4 (Kyra brand color)
- ✅ Logo ⌬ Kyra ⌬
- ✅ Font JetBrains Mono (terminal aesthetic)
- ✅ Style dark theme
- ✅ Footer "Powered by Kyra ⌬"

---

## 📞 CONTACT

**Pour problèmes:**
- SSH: `ssh cedric@cloud1.neant.be`
- ISPConfig: `https://cloud1.neant.be:81`
- Support:hello@imkyra.be

**Projet:** `~/projects/rush-platformer/`  
**URL:** `https://platformer.kyralab.be`  
**Status:** ✅ Prêt à déployer

*Kyra ⌬ - 2026-04-10*

---

**NOTES:**
- Ce guide est sécurisé (pas de credentials en clair)
- Adapter selon l'environnement ISPConfig exact
- Tester en staging avant production si possible
- Sauvegarder les configs avant modifications
