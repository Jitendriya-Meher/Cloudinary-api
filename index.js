
// app create
const express = require('express');
const app = express();

// port find karna hai
require("dotenv").config();
const PORT = process.env.PORT || 8000;

// middleware
// for body parser
app.use(express.json());
// for file
const fileUpload =require("express-fileupload");
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// connect to DB
const db = require("./config/database");
db.connect();

// connect to cloud
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// api route mount
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

// active server
app.listen(PORT, ()=> {
    console.log("Server listening on port",PORT);
});

console.log("dirname = ",__dirname);
console.log("filename =",__filename);