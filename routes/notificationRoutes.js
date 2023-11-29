const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/', notificationController.sendNotification);
router.get('/', notificationController.getAllNotifications);
router.put('/:id', notificationController.updateNotification);

module.exports = router;