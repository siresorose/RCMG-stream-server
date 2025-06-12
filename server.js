const express = require('express');

const app = express();

require('dotenv').config();

app.use(express.json());

// Authentication middleware
app.use((req, res, next) => {
    if (req.headers['x-api-key'] !== process.env.API_KEY) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    next();
});

// Example usage of rtmpUrls
app.post('/start-stream', (req, res) => {
    const { streamKey } = req.body;
    if (!streamKey) {
        return res.status(400).json({ error: 'Missing streamKey' });
    }

    const rtmpUrls = {
        youtube: `${process.env.YOUTUBE_RTMP_URL}/${streamKey}`,
        twitch: `${process.env.TWITCH_RTMP_URL}/${streamKey}`
    };

    // ... your stream logic here

    res.json({ rtmpUrls });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});