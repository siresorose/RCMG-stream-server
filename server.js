require('dotenv').config();
const express = require('express');
const router = require('./router');

const app = express();
app.use(express.json());

// API Key Middleware
app.use((req, res, next) => {
  if (req.headers['x-api-key'] !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
});

app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Stream Server running on port ${PORT}`);
  console.log('Endpoints:');
  console.log(`- POST /api/start/:platform (youtube|twitch|facebook)`);
  console.log(`- DELETE /api/stop/:streamId`);
});