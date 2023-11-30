const express = require('express');
const router = express.Router();
const accidentController = require('../controllers/accidentController');

router.post('/', accidentController.reportAccident);
router.get('/', accidentController.getAllAccidents);
router.get('/:id', accidentController.getAccidentById);
router.put('/:id', accidentController.updateAccident);
router.delete('/:id', accidentController.deleteAccident);
router.post('/nearestAmbulance', accidentController.getNearestAmbulance);

module.exports = router;