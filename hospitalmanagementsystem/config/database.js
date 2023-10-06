require('dotenv').config();

const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;


module.exports = mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});