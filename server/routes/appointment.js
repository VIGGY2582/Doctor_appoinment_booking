const express = require('express');
const router = new express.Router();
const appointmentController = require('../controllers/appointment');
const { auth, authorize } = require('../middleware/auth');

router.post('/', auth, authorize(['PATIENT']), appointmentController.createAppointment);
router.get('/', auth, appointmentController.getAppointments);
router.delete('/:id', auth, appointmentController.cancelAppointment);

module.exports = router;
