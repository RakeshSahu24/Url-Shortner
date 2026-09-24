const express = require('express');
const {handleGetShortUrl , handleGenerateNewShortUrl, handleGetAnalytics} = require('../controllers/url.js');
const router = express.Router();

router.post('/', handleGenerateNewShortUrl);
router.get('/:shortId', handleGetShortUrl);
router.get('/:shortId/analytics', handleGetAnalytics);

module.exports = router;