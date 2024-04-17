import { User } from "@/app/lib/model/user";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const payload = await req.json();

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    try {
        await mongoose.connect(process.env.MONGODB)
        const user = await User.findOne({ email: payload.email });
   
        if (!user) {
            return NextResponse.json({ message: 'User Not Found', success: false }, { status: 401 });
        } else {
            const tokenObject = {
                _id: user._id,
                varified: user.varified,
                email: user.email,
                role: user.role
            }
            const jwtToken = jwt.sign(tokenObject, process.env.SECRET, { expiresIn: '4h' });
            // console.log(jwtToken);
            return NextResponse.json({ token:jwtToken,tokenObject ,success:true });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'error', error }, { status: 500 });
    }
}