
const mongoose = require("mongoose");
require("dotenv").config();
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        imageUrl:{
            type:String,
        },
        tags:{
            type:String,
        },
        email:{
            type:String,
        }
    },
    {
        timestamps:true
    }
);

// post middleware
fileSchema.post( "save" , async function(doc){

    try{
        console.log("DOC = ",doc);

        // transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS
            }
        });
        // console.log("transporter = ", transporter);

        // send mail
        let info = await transporter.sendMail({
            from:"Jitendriya Meher",
            to: doc.email,
            subject: "New File Uploaded on Cloudinary",
            html:`<h2>Hello Jee <p>File Uploaded</p></h2> View here: <a href="${doc.imageUrl}">${doc.imageUrl}<a/>`,
        });

        console.log("INFO = ",info);

    }
    catch(e){
        console.log("error here : ",e);
    }

})


const File = mongoose.model('File',fileSchema);
module.exports = File;