# Folosim imaginea de bază Alpine Linux cu NodeJS preinstalat:
FROM node:18-alpine

# Setăm directorul de lucru în care vor fi copiate fișierele aplicației:
WORKDIR /app

# Copiem fișierul package.json și package-lock.json pentru a instala pachetele npm:
COPY package*.json ./

# Instalăm pachetele npm:
RUN npm install

# Copiem restul fișierelor aplicației în container:
COPY . .

# Expunem portul pe care rulează aplicația (în acest caz 3000):
EXPOSE 3000

# Pornim aplicația:
CMD ["npm", "run", "start"]
 