@echo off
chcp 65001 > nul
echo.
echo ========================================
echo   NEON PROTOCOL ⌬ - BUILD INSTALLER
echo   Pour Cey - Créer l'exécutable XPour JP
echo ========================================
echo.
echo.
echo [+] Installation des dependances...
echo.

REM Verifier si npm installe
npm install >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
   echo [!] Erreur npm install!
   pause
   exit /b 1
)

echo.
echo [+] Construction du .exe Windows...
echo.
echo [1/2] Build en cours...
npm run build:win

if %ERRORLEVEL% NEQ 0 (
   echo.
   echo [!] Erreur lors du build!
   echo.
   echo Regarde les erreurs ci-dessus.
   echo Verifie que Node.js et Electron sont installes.
   pause
   exit /b 1
)

echo.
echo [+] Construction reussie!
echo.
echo [2/2] Fichiers dans: dist\NEON PROTOCOL Setup 3.0.0.exe
echo.
echo ========================================
echo   ✅ L'exécutable est pret!
echo   📁 Copie-le sur une cje USB
echo   🚀 Envoie-le a JP!
echo ========================================
echo.

start dist\
pause
