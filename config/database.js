
const mongoose = require('mongoose');
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useUnifiedTopology : true,
        useNewUrlParser : true
    })
    .then(
        console.log("DB connection established successfully")
    )
    .catch(
        (err) =>{
            console.log("DB connection error: " + err);
        }
    );
};