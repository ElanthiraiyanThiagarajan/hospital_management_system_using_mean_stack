const express = require("express");
require("dotenv").config();


require('./config/database')



//middleware
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use('/api/doctors', require('./routes/doctorRoutes'));

app.listen(port, () => {
  console.log("Server is running on port"+port);
});

module.exports = app;