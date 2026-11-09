#!/bin/bash
set -e

PROJECT_DIR="/home/carmay-dev/proyectos/webDul"

echo "🎂 =============================================="
echo "   DULCERÍA EL LÍDER - SINCRONIZACIÓN Y DESPLIEGUE"
echo "=================================================="

cd "$PROJECT_DIR"

echo "1. Sincronizando fotos de Google Drive y compilando..."
export PATH="$HOME/.nvm/versions/node/v22.23.4/bin:$PATH"
npm run build

echo "2. Guardando cambios en repositorio y base de datos..."
git add data/database.sqlite public/ scripts/ package.json
if git diff --staged --quiet; then
    echo "ℹ️ No hubo cambios nuevos en imágenes ni datos."
else
    git commit -m "sync(drive): actualización automática de imágenes desde Google Drive"
    git push origin main
fi

echo "3. Desplegando en Vercel Producción..."
./node_modules/.bin/vercel --prod --yes

echo "=================================================="
echo "✅ ¡LISTO! Tu web en producción está 100% actualizada:"
echo "   https://dulceria-el-lider.vercel.app"
echo "=================================================="
