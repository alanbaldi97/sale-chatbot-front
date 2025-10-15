# Etapa 1: Construcción
FROM node:22-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./
COPY . .

# Instalar dependencias
RUN npm install

# Construir el proyecto (modo producción)
RUN npm run build

# Etapa 2: Imagen final
FROM node:22-alpine AS runner

WORKDIR /app

# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

# Instalar solo dependencias necesarias para producción
RUN npm install --omit=dev

# Exponer el puerto (por defecto 3000)
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", ".output/server/index.mjs"]
