const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.post('/register', doctorController.registerDoctor);
router.post('/login', doctorController.loginDoctor);
router.get('/getAllDoctors', doctorController.getAllDoctors);
router.get('/getDoctorById/:id', doctorController.getDoctorById);



module.exports = router;