#!/bin/bash
# Déploiement NEON PROTOCOL v5.4.7 vers GitHub Pages
# Usage: ./deploy-gh-pages.sh [--dry-run]

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUILD_DIR="${PROJECT_ROOT}/public"
DRY_RUN=false

if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "⚠️  Mode dry-run activé"
fi

echo "🚀 NEON PROTOCOL v5.4.7 - Déploiement GitHub Pages"
echo "📁 Build dir: ${BUILD_DIR}"
echo ""

# 1. Build du bundle
echo "📦 Build du bundle..."
npx esbuild game.js \
  --bundle \
  --outfile="${BUILD_DIR}/game-bundle.js" \
  --format=iife \
  --target=es2020 \
  --minify=false \
  --keep-names

# 2. Créer le répertoire de travail temporaire
TEMP_DIR=$(mktemp -d)
echo "📂 Dossier temporaire: ${TEMP_DIR}"

# 3. Copier les fichiers nécessaires
cp -v "${PROJECT_ROOT}/index.html" "${TEMP_DIR}/"
cp -v "${BUILD_DIR}/game-bundle.js" "${TEMP_DIR}/"
cp -v "${BUILD_DIR}/game-inline.js" "${TEMP_DIR}/" 2>/dev/null || true
cp -v "${PROJECT_ROOT}/.nojekyll" "${TEMP_DIR}/" 2>/dev/null || true

# Copier les assets si existants (images, sons)
if [[ -d "${BUILD_DIR}/assets" ]]; then
  cp -r "${BUILD_DIR}/assets" "${TEMP_DIR}/"
fi

# 4. Créer la branche gh-pages si inexistante
cd "${PROJECT_ROOT}"
CURRENT_BRANCH=$(git branch --show-current)

echo "🌿 Branche actuelle: ${CURRENT_BRANCH}"

# Vérifier si gh-pages existe localement
if git show-ref --quiet "refs/heads/gh-pages"; then
  echo "✅ Branche gh-pages existe"
else
  echo "🆕 Création de la branche gh-pages..."
  git checkout --orphan gh-pages
  git rm -rf .
  git commit --allow-empty -m "Initial gh-pages"
  git checkout "${CURRENT_BRANCH}"
fi

# 5. Déployer (push sur origin/gh-pages)
if [[ "${DRY_RUN}" == "true" ]]; then
  echo "🔍 Dry-run: fichiers prêts dans ${TEMP_DIR}"
  ls -la "${TEMP_DIR}"
else
  echo "⬆️  Déploiement sur origin/gh-pages..."
  # Copier dans gh-pages branch
  git checkout gh-pages
  rm -rf ./*
  cp -r "${TEMP_DIR}"/* .
  git add .
  git commit -m "🚀 Deploy v5.4.7 to GitHub Pages - $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  git push origin gh-pages
  echo "✅ Déploiement terminé!"
  echo "🌐 Site: https://freecey.github.io/neon-protocol/"
fi

# Nettoyage
rm -rf "${TEMP_DIR}"
