// routes/api/scraper

const express = require('express');
const router = express.Router();
const scraperCtrl = require('../../controllers/api/scrapers');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// /api/users
router.get('/cnn', ensureLoggedIn, scraperCtrl.cnn);


module.exports = router;