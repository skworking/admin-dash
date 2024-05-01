import { NextResponse } from "next/server";
import { StateModel } from "@/app/lib/model/statemodel";
import mongoose from "mongoose";

export async function POST(request) {
    await mongoose.connect(process.env.MONGODB)
    try {
        const payload = await request.json();
        console.log(payload);
        const existingBrand = await StateModel.findOne({ state: payload.state });
        if (existingBrand) {
            return NextResponse.json({ message: 'state already registered', success: false });
        } else {

            let model = new StateModel(payload)
            const result = await model.save();
            return NextResponse.json({ result, success: true ,message:"Record added Successfull"})
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
            data = await StateModel.find();
        } catch (err) {
            console.log(err);
            data = { Success: false, err }
        }

        return NextResponse.json({ result: data, success: true })
    } catch (err) {
        console.log(err);
    }
}


