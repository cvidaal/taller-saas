#!/bin/bash

# Script para iniciar el proyecto con Docker

echo "🚀 Iniciando Taller SaaS con Docker..."
echo ""

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor instala Docker primero."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose no está instalado. Por favor instala Docker Compose primero."
    exit 1
fi

# Construir y levantar los servicios
echo "📦 Construyendo imágenes Docker..."
docker-compose build

echo ""
echo "🗄️  Iniciando base de datos..."
docker-compose up -d postgres

# Esperar a que PostgreSQL esté listo
echo "⏳ Esperando a que PostgreSQL esté listo..."
sleep 5

# Ejecutar migraciones y seed
echo ""
echo "🔧 Ejecutando migraciones de Prisma..."
docker-compose run --rm backend npx prisma migrate deploy

echo ""
echo "🌱 Ejecutando seed de datos..."
docker-compose run --rm backend npm run seed

# Iniciar todos los servicios
echo ""
echo "🚀 Iniciando todos los servicios..."
docker-compose up -d

echo ""
echo "✅ ¡Taller SaaS está listo!"
echo ""
echo "📍 URLs:"
echo "   Frontend: http://localhost"
echo "   Backend API: http://localhost:3000/api/v1"
echo ""
echo "🔑 Credenciales de prueba:"
echo "   Email: admin@google.com"
echo "   Contraseña: 123456"
echo ""
echo "📋 Comandos útiles:"
echo "   Ver logs: docker-compose logs -f"
echo "   Detener: docker-compose down"
echo "   Reiniciar: docker-compose restart"
echo ""
