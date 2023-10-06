const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const doctorSchema = new mongoose.Schema({
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
    specialty: String,
    contact_info: {
        phone:String,
        address:String
    }

});

doctorSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    try{
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch(error){
       return next(error);
    }
});


module.exports = mongoose.model('Doctor', doctorSchema);    
