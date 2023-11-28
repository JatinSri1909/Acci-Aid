const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

router.get('/', hospitalController.getAllHospitals);
router.get('/:id', hospitalController.getHospitalById);

module.exports = router;