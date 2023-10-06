const Doctor = require('../models/Doctor');

exports.getAllDoctorList = async () => {
   return await Doctor.find();
};

exports.getDoctorsById = async (id) => {
    return await Doctor.findById(id);
 };