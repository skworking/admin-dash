import { NextResponse } from "next/server";
import { BModel } from "@/app/lib/model/brandmodel";
import mongoose from "mongoose";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const query = searchParams.get('id') || '';

        // Assuming BModel is your Mongoose model
        await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
        const record = await BModel.findById(query);
        // Returning the found record as JSON response
        if (record) {
            return NextResponse.json({ record, status: '200', success: true })
        } else {
            return NextResponse.json({ message: "Record not found", status: '404' })
        }
    } catch (err) {

        return NextResponse.json({ message: "Internal server error", status: '500', success: false })
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
        return NextResponse.json({result,success:true})
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }
}