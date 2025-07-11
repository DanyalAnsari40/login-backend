import { v2 } from "cloudinary";

import fs from 'fs'
import { url } from "inspector";

// Configuration
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});



const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload the file on cloudnary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("file is UpLoaded on Cloudnary");
        response.url;
        return response

    } catch (err) {
        console.log(err);
        fs.unlinkSync(localFilePath)//remove the localy saved temproy saved fil as the upload operation got faild

    }
}

