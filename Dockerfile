FROM node:18
WORKDIR /app
COPY . .
RUN npm install -g botpress@12.27.1
CMD ["botpress", "start"]
