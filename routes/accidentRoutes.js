const express = require('express');
const router = express.Router();
const accidentController = require('../controllers/accidentController');

router.post('/', accidentController.reportAccident);

module.exports = router;