FROM node:18-slim

WORKDIR /app
COPY package*.json ./
RUN apt-get update && apt-get install -y ffmpeg
RUN npm ci --only=production
COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
