const router = require('express').Router();

// Your existing /start endpoint code here
router.post('/start', (req, res) => {
    // ... your streaming logic ...
    res.status(200).json({ message: 'Stream started' });
});

module.exports = router; // Must export the router directly