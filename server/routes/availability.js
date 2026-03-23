const express = require('express');
const router = new express.Router();
const availabilityController = require('../controllers/availability');
const { auth, authorize } = require('../middleware/auth');

router.post('/', auth, authorize(['DOCTOR']), availabilityController.addAvailability);
router.get('/:doctorId', availabilityController.getAvailability);

module.exports = router;
