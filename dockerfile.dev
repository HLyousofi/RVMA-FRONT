
# Utiliser une image Node.js
FROM node:20

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (ou yarn.lock)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port (par exemple, 3000 pour React)
EXPOSE 3000

# Commande pour démarrer l'application en mode développement
CMD ["npm", "start"]