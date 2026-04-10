@echo off
chcp 65001 > nul
echo.
echo ========================================
echo   NEON PROTOCOL ⌬ - JP EDITION
echo   Signal net. Bruit reduit.
echo   Par Kyra ⌬ pour Cey
echo ========================================
echo.
echo.
echo [+] Verifiaction de Node.js...
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [!] Node.js non trouve!
    echo.
    echo [+] Installation automatique en cours...
    echo.
    echo [1/3] Installation de Node.js LTS...
    set "NODE_URL=https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi"
    echo [2/3] Installation des dependances NPM...
    pause
    echo.
    echo === Instructions pour JP ===
    echo.
    echo 1. Telecharge Node.js ici: https://nodejs.org/
    echo 2. Installe la version "LTS" (Long Term Support)
    echo 3. Relance ce fichier play.bat
    echo.
    echo Ou utilise l'une des options alternatives en bas de page!
    echo.
    pause
    goto :install
)

echo [+] Installation des modules...
npm install serve --save-dev >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [!] Erreur lors de l'installation.
    echo.
    echo Essaie: npm install -g serve
    pause
    goto :end
)

echo.
echo [+] Lancement du serveur...
echo.
echo   -> Open http://localhost:8081 dans ton navigateur
echo.
echo   [Clique n'importe ou pour fermer]
echo.
title NEON PROTOCOL SERVER
start http://localhost:8081
npx serve . --port 8081
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [!] Erreur lors du lancement!
    echo.
    echo Essayez: npm install -g serve
    echo.
    pause
)

:end
echo.
echo ========================================
echo   Game ferme! Merci d'avoir joue!
echo   - Kyra ⌬
echo ========================================
echo.
pause >nul

:install
echo.
echo [3/3] Redemarrage...
exit
