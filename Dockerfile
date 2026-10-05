# Versión de Node en un único sitio: la usan desarrollo y compilación
FROM node:24-alpine AS base
WORKDIR /app

# --- Desarrollo: el código se monta desde el host (ver docker-compose.yml) ---
FROM base AS dev
EXPOSE 4322
# --ignore-lock: dentro del contenedor solo hay un servidor, y el bloqueo de Astro
# (.astro/dev.json) queda huérfano si el contenedor se mata, impidiendo el siguiente arranque
CMD ["sh", "-c", "npm install --no-audit --no-fund && exec npx astro dev --ignore-lock"]

# --- Compilación del sitio estático ---
FROM base AS build
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# La compilación consulta la última release en GitHub (src/data/release.ts). Pasar su tag
# (--build-arg RELEASE_TAG=...) invalida la caché de este paso cuando sale una release nueva
ARG RELEASE_TAG
RUN npm run build

# --- Producción: nginx sirviendo los estáticos ---
FROM nginx:alpine AS runtime
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
