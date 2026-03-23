const express = require('express');
const router = new express.Router();
const doctorController = require('../controllers/doctor');

router.get('/', doctorController.getDoctors);
router.get('/:id', doctorController.getDoctorById);

module.exports = router;
