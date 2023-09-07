// routes/api/scrapper

const express = require('express');
const router = express.Router();
const scrapperCtrl = require('../../controllers/api/scrappers');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// /api/users
router.get('/cnn', ensureLoggedIn, scrapperCtrl.cnn);


module.exports = router;