import { NextResponse } from "next/server";
import { BModel } from "@/app/lib/model/brandmodel";
import mongoose from "mongoose";


export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
    
        const q = searchParams.get('_id')||'';
        console.log("query",q);
        
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