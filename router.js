const router = require('express').Router();
const { spawn } = require('child_process');

const activeStreams = new Map();

router.post('/start', (req, res) => {
    const { streamKey } = req.body;
    if (!streamKey) {
        return res.status(400).json({ error: 'Missing streamKey' });
    }
    if (activeStreams.has(streamKey)) {
        return res.status(409).json({ error: 'Stream already active' });
    }

    // Example: Start ffmpeg process for RTMP streaming
    const ffmpeg = spawn('ffmpeg', [
        '-re',
        '-i', 'input.mp4', // Replace with your input source
        '-c:v', 'libx264',
        '-f', 'flv',
        `rtmp://localhost/live/${streamKey}`
    ]);

    ffmpeg.on('error', (err) => {
        activeStreams.delete(streamKey);
        return res.status(500).json({ error: 'Failed to start stream', details: err.message });
    });

    ffmpeg.stderr.on('data', (data) => {
        // Optionally log ffmpeg output
        // console.log(`ffmpeg: ${data}`);
    });

    ffmpeg.on('close', (code) => {
        activeStreams.delete(streamKey);
        // Optionally notify about stream end
    });

    activeStreams.set(streamKey, ffmpeg);
    res.json({ message: 'Stream started', streamKey });
});

module.exports = router;