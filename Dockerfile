# Dockerfile mínimo para Render
FROM node:16
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
