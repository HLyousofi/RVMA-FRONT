# Étape de construction
FROM node:20-alpine AS build
WORKDIR /app
# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

RUN npm install --dry-run
# Utiliser npm ci pour une installation déterministe
RUN npm install --omit=dev --no-audit --no-fund && npm cache clean --force
# Copier le reste du code
COPY . .
# Construire l'application
RUN npm run build
 
# Étape de production
FROM nginx:alpine
# Installer des outils pour gérer les certificats si nécessaire
RUN apk add --no-cache curl
# Copier les fichiers buildés
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 8080 nginx 
EXPOSE 8080 8082
# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]