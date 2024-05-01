import { NextResponse } from "next/server";
import { BModel } from "@/app/lib/model/brandmodel";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

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

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
    
        const query = searchParams.get('id')||'';
        console.log("dd",query);
        const q={_id:query}
        if (!query) {
            // If 'id' parameter is missing, return a response indicating that it's required
            return NextResponse.json({ message: "ID parameter is required", status: '400', success: false });
        }
  
        // Assuming BModel is your Mongoose model
        await mongoose.connect(process.env.MONGODB)
        const record = await BModel.findById(q);
        // Returning the found record as JSON response
        if (record) {
            return NextResponse.json({ record, status: '200', success: true })
        } else {
            return NextResponse.json({ message: "Record not found", status: '404' })
        }
    } catch (error) {

        return NextResponse.json({error, message: "Internal server error", status: '500', success: false })
    }
}

export async function PUT(request,{params}){
    try{
        const userId=params.id;
        console.log("id",userId);
        const filter={_id:userId}
        const payload=await request.json();
        
        await mongoose.connect(process.env.MONGODB)
        const result=await BModel.findOneAndUpdate(filter,payload,{ new: true });
        return NextResponse.json({result,success:true,message:"Record Updated Successful!"})
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }
}

export async function DELETE(request,content){
    try{
        await authenticateToken(request)
        const Id=content.params.id;
        const record={_id:Id}
        await mongoose.connect(process.env.MONGODB)
        const result=await BModel.deleteOne(record);
        return NextResponse.json({result,success:true,message:"Record deleted Successful!"})
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }
}