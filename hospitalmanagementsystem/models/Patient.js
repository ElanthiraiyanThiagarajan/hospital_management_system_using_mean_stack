const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date_of_birth: Date,
    gender : String,
    contact_info: {
        phone:String,
        address:String
    }

});

patientSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    try{
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch(error){
       return next(error);
    }
});

module.exports = mongoose.model('Patient', patientSchema);