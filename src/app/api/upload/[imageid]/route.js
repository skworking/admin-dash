import { NextResponse } from "next/server";
import { Image } from "@/app/lib/model/image";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
// import { writeFile } from 'fs/promises';
function authenticateToken(req) {
    return new Promise((resolve, reject) => {
        // Get the JWT token from the Authorization header
        const authHeader = req.headers.get('authorization');
        // console.log(authHeader);
        const token = authHeader && authHeader.split(' ')[1];

        // If no token provided, return 401 Unauthorized
        if (!token) {
            reject({ status: 401, message: 'Authentication token is missing' });
        }

        // Verify the token
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                reject({ status: 403, message: 'Invalid token' });
            }
            // If token is valid, resolve with the user
            // resolve(user);
            resolve({ user: decoded, tokenData: decoded });
        });
    });
}

export async function PUT(request,{params}){
    try{
        await mongoose.connect(process.env.MONGODB)
        // await authenticateToken(request)
        const imageId=params.imageid;
       
        const filter={_id:imageId}
        
        const payload=await request.formData();
        const file=payload.get("file")
        if (!file) {
            return NextResponse.json({Success:false,status:400})
        }
        const bytes = await file?.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const updatedImageData ={
            'image.data': buffer,
            'image.name': file.name,
            'image.contentType': file.type
        }
        
        console.log("--",updatedImageData);
        const result = await Image.findOneAndUpdate(filter, {$set:updatedImageData}, { new: true });
        // const result=await Image.findOneAndUpdate(filter,newImage,{ new: true });
        if (!result) {
            return NextResponse.json({ success: false, error: 'Document not found', status: 404 });
        }
        return NextResponse.json({result,success:true})
    }catch(error){
        console.error('Error:', error);
        return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  
    }
}