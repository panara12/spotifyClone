import {v2 as couldupload} from "cloudinary"
import fs from "fs"

couldupload.config({
    cloud_name:process.env.COULD_NAME,
    api_key:process.env.API_KEY,
    api_secret:API_SECRET
})

const uploadImage = async(filePath)=>{
    try {
        if(!filePath) return null
        const response= await couldupload.uploader.upload(filePath, {
            resource_type: "auto"
        })
        console.log("file response"+response);
        return response
    } catch (error) {
        fs.unlinkSync(filePath)//remove local file path 
        return null;
        
    }
}