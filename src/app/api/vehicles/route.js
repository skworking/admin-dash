import { NextResponse } from "next/server";
import { Vehicle } from "@/app/lib/model/vehicle";
import mongoose from "mongoose";

export async function POST(request) {
    await mongoose.connect(process.env.MONGODB)
    try {
        // await authenticateToken(request)

        const payload = await request.json();
        console.log("payload", payload);
        let product = new Product(payload)
        const result = await Vehicle.save();
        return NextResponse.json({ result, success: true })


    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: error.message }, { status: error.status || 500 });

    }
}
