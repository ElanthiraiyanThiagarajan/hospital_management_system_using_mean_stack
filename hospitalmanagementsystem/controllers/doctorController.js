const Doctor = require('../models/Doctor');
const doctorService = require('../services/doctorService');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerDoctor = async (req, res) => {
    const { name, email, password, specialty, contact_info } = req.body;
    try {
        const doctorExist = await Doctor.findOne({ email });
        if (doctorExist) {
            return res.status(400).json({
                message: 'Doctor already exists'
            });
        } else {
            const doctor = new Doctor({
                name,
                email,
                password,
                specialty,
                contact_info
            });
            await doctor.save();
            res.status(200).json({
                message: 'Doctor registered successfully'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await Doctor.findOne({ email });
        if (doctor) {
            const isMatch = await bycrypt.compare(password, doctor.password);
            if (isMatch) {
                const token = jwt.sign({
                    _id: doctor._id,
                    name: doctor.name,
                    email: doctor.email
                }, process.env.JWT_SECRET);
                res.status(200).json({
                    message: 'Login successful',
                    token
                });
            } else {
                res.status(400).json({
                    message: 'Invalid password'
                });
            }
        } else {
            res.status(400).json({
                message: 'Doctor already registered'
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }

};

exports.getAllDoctors = async (req, res) => {

    try {
        let allDoctors = await doctorService.getAllDoctorList();
        res.status(200).json(allDoctors);
    } catch (error) {
        res.status(500).json(error);
    }

};

exports.getDoctorById = async (req, res) => {

    try {
        let doctor = await doctorService.getDoctorsById(req.params.id);
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json(error);
    }

};
