FROM node:20-slim

WORKDIR /app
COPY package*.json ./
RUN apt-get update && apt-get install -y ffmpeg
RUN npm ci --only=production
COPY . .

# RTMP standard port + HTTP fallback
EXPOSE 1935 3000

CMD ["node", "server.js"]
