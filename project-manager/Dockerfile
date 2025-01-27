FROM node:23


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Instala las dependencias de Nest CLI globalmente
RUN npm install -g @nestjs/cli

RUN npm install

# Expone los puertos de nustros microservicios 
EXPOSE 8000 8001 8002 8003 8004

# Comando por defecto para desarrollo
CMD npm run start:dev & \
nest start users --watch & \
nest start authentication --watch & \
nest start projects --watch & \
nest start tasks --watch