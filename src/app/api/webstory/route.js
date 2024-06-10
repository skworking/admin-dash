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

export async function POST(request) {
    await mongoose.connect(process.env.MONGODB)
    try {
        // await authenticateToken(request)
        const payload = await request.json();
        console.log("data", payload);
        let story = new Story(payload)
        const result = await story.save();
        return NextResponse.json({ result, success: true })
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }
}