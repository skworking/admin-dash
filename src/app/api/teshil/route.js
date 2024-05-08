import { NextResponse } from "next/server";
import { TeshilModel } from "@/app/lib/model/teshilmodel";
import mongoose from "mongoose";

export async function POST(request) {
    await mongoose.connect(process.env.MONGODB)
    try {
        const payload = await request.json();
        console.log(payload);
        const existingTeshil = await TeshilModel.findOne({ teshil: payload.teshil });
        if (existingTeshil) {
            return NextResponse.json({ message: 'Teshil are already registered', success: false });
        } else {

            let model = new TeshilModel(payload)
            const result = await model.save();
            return NextResponse.json({ result, success: true ,message:"Record added Successfull"})
        }


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }
}