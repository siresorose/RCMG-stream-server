const express = require('express');
const router = require('./router');

const app = express();

// Middleware to log all incoming requests
app.use((req, res, next) => {
    console.log(`Incoming: ${req.method} ${req.path}`);
    next();
});

app.use(express.json());
app.use('/', router); // All routes will be under /

app.get('/health', (req, res) => {
    res.send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Available routes:');
    console.log('POST /start');
    console.log('GET /health');
});