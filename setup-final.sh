#!/bin/bash
set -e

echo "🔧 CONFIGURACIÓN FINAL DEL SISTEMA DE AUTENTICACIÓN"
echo "=================================================="
echo ""

# 1. Detener procesos anteriores
echo "1₵️⃣ Deteniendo procesos previos..."
pkill -f "next dev" 2>/dev/null || true
pkill -f "node" 2>/dev/null || true
sleep 2

# 2. Instalar dependencias
echo "2₵️⃣ Instalando dependencias..."
npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# 3. Generar cliente Prisma
echo "3₵️⃣ Generando cliente Prisma..."
npx prisma generate

# 4. Sincronizar BD
echo "4₵️⃣ Sincronizando base de datos..."
npx prisma db push --skip-generate --force-reset

# 5. Seed
echo "5₵️⃣ Creando usuario de prueba..."
npx ts-node prisma/seed.ts || echo "Usuario ya existe"

# 6. Limpiar cache
echo "6₵️⃣ Limpiando cache de Next.js..."
rm -rf .next .next/cache node_modules/.cache 2>/dev/null || true

# 7. Build
echo "7₵️⃣ Compilando aplicación..."
npm run build

# 8. Iniciar dev
echo ""
echo "✅ ¡LISTO! Iniciando servidor en modo desarrollo..."
echo ""
npm run dev
