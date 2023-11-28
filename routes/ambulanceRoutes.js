const express = require('express');
const router = express.Router();
const ambulanceController = require('../controllers/ambulanceController');

router.get('/', ambulanceController.getAllAmbulances);
router.get('/:id', ambulanceController.getAmbulanceById);
router.put('/:id', ambulanceController.updateAmbulance);

module.exports = router;