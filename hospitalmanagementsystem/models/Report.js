const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    patient_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date: Date,
    status: String,
    description: String,
    diagnosis: String,
    treatment: String,
    medications: [String],
    attachments: [String]
});

module.exports = mongoose.model('Report', reportSchema);