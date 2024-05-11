import { NextResponse } from "next/server";
import {District } from "@/app/lib/model/districtCity";
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

export async function POST(request){
    await mongoose.connect(process.env.MONGODB)
    try{
        const payload = await request.json();
        console.log(payload);
        const existingDistrict=await District.findOne({name:payload.name})
        if (existingDistrict) {
            return NextResponse.json({ message: 'District already registered', success: false });
        } else {

            let district = new District(payload)
            const result = await district.save();
            return NextResponse.json({ result, success: true ,message:"Record added Successfull"})
        }
    }catch(err){
        return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }
}
export async function GET() {
    try {
       
        let data = []
        try {

            const res = await mongoose.connect(process.env.MONGODB, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            data = await District.find();
        } catch (err) {
            console.log(err);
            data = { Success: false, err }
        }

        return NextResponse.json({ result: data, success: true })
    } catch (err) {
        console.log(err);
    }
}
