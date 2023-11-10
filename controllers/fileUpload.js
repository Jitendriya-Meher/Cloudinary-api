
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// localFileUploader -> handler function
exports.localFileUpload = async (req, res) => {

    try{
        
        // fetch file from request
        const file = req.files.file;
        console.log("File aagyi bhai -> ",file);

        // path for storing the file in server
        // create path , where file need to be store on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".").at(-1)}`;
        console.log("path -> ",path);

        // add path to move function
        file.mv( path , (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message:"Local file was successfully Uploaded"
        });
        
    }
    catch(err){
        console.log("errpr in uploading local file ",err);
    }
}

function isFileTypeSupported( type , supportedTypes ){

    return supportedTypes.includes(type);
}


async function uploadFileToCloudinary( file, folder, quality){

    const options = {folder};
    options.resource_type = "auto";

    if(quality){
        options.quality = quality;
    }

    console.log("temp file path: " + file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, options);

}


// image uploader
exports.imageUpload = async (req,res) => {

    try{
        // data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log("File: " , file);

        // validation
        const supportedTypes = ["png", "jpg", "jpeg"];
        const filetype = file.name.split(".").at(-1).toLowerCase();

        if( ! isFileTypeSupported(filetype, supportedTypes)){

            return res.status(400).json({
                success:false,
                message: "File type not supported"
            })
        }

        // file formate supported
        
        const response = await uploadFileToCloudinary( file, "codehelp");
        console.log("response = ",response);

        // entry to db
        const fileData = await File.create({
            name,tags,email,imageUrl:response.secure_url
        });

        res.status(200).json({
            success:true,
            message: "Image successfully uploaded",
            data:fileData
        });

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message: "Image failed to be uploaded"
        });
    }
}

// video uploader
exports.videoUpload = async (req ,res) => {

    try{

        // data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;
        console.log("File: " , file);

        // validation
        const supportedTypes = ["mp4", "mov"];
        const filetype = file.name.split(".").at(-1).toLowerCase();

        if( ! isFileTypeSupported(filetype, supportedTypes)){

            return res.status(400).json({
                success:false,
                message: "File type not supported"
            })
        }

        // file formate supported
        
        const response = await uploadFileToCloudinary( file, "codehelp");
        console.log("response = ",response);

        // entry to db
        const fileData = await File.create({
            name,tags,email,imageUrl:response.secure_url
        });

        res.status(200).json({
            success:true,
            message: "video successfully uploaded",
            data:fileData
        });
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message: "Video failed to be uploaded"
        });
    }

}

exports.imageSizeReducer = async (req ,res) => {

    try{
        // data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);
        console.log("image reducer");

        const file = req.files.imageFile;
        console.log("File: " , file);

        // validation
        const supportedTypes = ["png", "jpg", "jpeg"];
        const filetype = file.name.split(".").at(-1).toLowerCase();

        if( ! isFileTypeSupported(filetype, supportedTypes)  ){

            return res.status(400).json({
                success:false,
                message: "File type not supported"
            })
        }

        // file formate supported
        const response = await uploadFileToCloudinary( file, "codehelp", 30);
        console.log("response = ",response);

        // entry to db
        const fileData = await File.create({
            name,tags,email,imageUrl:response.secure_url
        });

        res.status(200).json({
            success:true,
            message: "compress Image successfully uploaded",
            data:fileData
        });

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message: "compress Image failed to be uploaded"
        });
    }
}