const router = require('express').Router();
const { spawn } = require('child_process');

const activeStreams = new Map();

// RTMP Endpoints (Replace with your actual stream keys)
const PLATFORMS = {
    youtube: 'rtmp://a.rtmp.youtube.com/live2/YOUR_YOUTUBE_KEY',
    twitch: 'rtmp://live.twitch.tv/app/YOUR_TWITCH_KEY',
    facebook: 'rtmps://live-api-s.facebook.com:443/rtmp/YOUR_FB_KEY'
};

// Start Stream
router.post('/start/:platform', (req, res) => {
    const { platform } = req.params;
    
    if (!PLATFORMS[platform]) {
        return res.status(400).json({ error: 'Invalid platform' });
    }

    const ffmpeg = spawn('ffmpeg', [
        '-i', '-',
        '-c:v', 'libx264',
        '-preset', 'ultrafast',
        '-tune', 'zerolatency',
        '-f', 'flv',
        PLATFORMS[platform]
    ]);

    ffmpeg.on('error', (err) => console.error('FFmpeg error:', err));
    
    const streamId = Date.now().toString();
    activeStreams.set(streamId, ffmpeg);
    
    res.json({ 
        success: true,
        streamId,
        platform
    });
});

// Stop Stream
router.delete('/stop/:streamId', (req, res) => {
    const { streamId } = req.params;
    const stream = activeStreams.get(streamId);
    
    if (stream) {
        stream.kill();
        activeStreams.delete(streamId);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Stream not found' });
    }
});

module.exports = router;