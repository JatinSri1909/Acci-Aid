const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/', feedbackController.receiveFeedback);
router.get('/', feedbackController.getAllFeedbacks);

module.exports = router;