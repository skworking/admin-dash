import { NextResponse } from "next/server";
import { BModel } from "@/app/lib/model/brandmodel";
import mongoose from "mongoose";

export async function POST(request){
    await mongoose.connect(process.env.MONGODB)
    try{
        const payload = await request.json();
        console.log("payload", payload);
        let model = new BModel(payload)
        const result = await model.save();
        return NextResponse.json({ result, success: true })

    }catch(error){
        return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }
}