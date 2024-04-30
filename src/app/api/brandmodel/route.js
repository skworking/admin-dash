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
export async function POST(request) {
    await mongoose.connect(process.env.MONGODB)
    try {
        const payload = await request.json();
        const existingBrand = await BModel.findOne({ brand: payload.brand });
        if (existingBrand) {
            return NextResponse.json({ message: 'brand already registered', success: false });
        } else {

            let model = new BModel(payload)
            const result = await model.save();
            return NextResponse.json({ result, success: true })
        }


    } catch (error) {
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
            data = await BModel.find();
        } catch (err) {
            console.log(err);
            data = { Success: false, err }
        }

        return NextResponse.json({ result: data, success: true })
    } catch (err) {
        console.log(err);
    }
}


