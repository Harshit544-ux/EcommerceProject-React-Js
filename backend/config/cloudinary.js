import {v2 as cloudinary } from 'cloudinary'

const connectCloudinary =async (()=>{
    cloudinary.config({
        cloud_name:process.env.cloud_name,
        api_key:process.env.api_key,
        api_secret:process.env.secret_key
    })
})

export default connectCloudinary;