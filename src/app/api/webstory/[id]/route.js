import { Story } from "@/app/lib/model/webstorymodel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
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
        const query = searchParams.get('_id')||'';
        console.log(query);
        
        // Assuming BModel is your Mongoose model
        await mongoose.connect(process.env.MONGODB)
        const record = await Story.findById(query);
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
