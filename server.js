const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server is running`);
    console.log(`🌐 Access it at: ${process.env.CODESPACE_NAME ? 
        `https://${process.env.CODESPACE_NAME}-${PORT}.preview.app.github.dev` : 
        `http://localhost:${PORT}`}`);
});