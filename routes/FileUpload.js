
const express = require("express");
const route = express.Router();

const {localFileUpload,imageUpload,videoUpload,imageSizeReducer} = require("../controllers/fileUpload");


route.post("/localFileUpload",localFileUpload);
route.post("/imageUpload",imageUpload);
route.post("/videoUpload",videoUpload);
route.post("/imageSizeReducer",imageSizeReducer);

module.exports = route;