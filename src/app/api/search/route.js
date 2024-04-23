import { NextResponse } from "next/server";
import { Product} from '../../lib/model/products'
import mongoose from "mongoose";


export async function GET(request){
    let records;
    try{
        const {searchParams}=new URL(request.url)
        const query = searchParams.get('name')||'';
        console.log(query);
        await mongoose.connect(process.env.MONGODB,{ useNewUrlParser: true, useUnifiedTopology: true })
        if(query){
            console.log(query);
            records = await Product.find({ name: { $regex: new RegExp(query, 'i') } });
        }
      
        return NextResponse.json({result:records || [],success:true})
       
    }catch(err){
        return NextResponse.json({ message: 'Internal server error', success: false });
    }
}