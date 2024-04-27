import { NextResponse } from "next/server";
import { BModel } from "@/app/lib/model/brandmodel";
import mongoose from "mongoose";

export async function POST(request){
    await mongoose.connect(process.env.MONGODB)
    try{
        const payload = await request.json();
        const existingBrand = await BModel.findOne({ brand: payload.brand });
        if (existingBrand) {
              return NextResponse.json({ message: 'brand already registered',success:false });
        }else{

            let model = new BModel(payload)
            const result = await model.save();
            return NextResponse.json({ result, success: true })
        }


    }catch(error){
        return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }
}

export async function GET(){
    await mongoose.connect(process.env.MONGODB)
    try{
        let data=await BModel.find();
        return NextResponse.json({result:data,success:true})
    }catch(error){
        console.log(error);
    }
}