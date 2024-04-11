import { con } from "@/app/lib/db";
import { Product } from "@/app/lib/model/products";

import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    
    let data=[]
    try{
        await mongoose.connect(con)
        data =await Product.find();
    }catch(err){
        console.log(err);
        data={Success:false}
    }

    return NextResponse.json({result:data,success:true})
}



export async function POST(request){
    await mongoose.connect(con)
    const payload=await request.json();
    console.log("payload",payload);
    let product=new Product(payload)
    const result=await product.save();
    return NextResponse.json({result,success:true})

    // try{
    // 
    //  await mongoose.connect(con)
    //     let user=new User({
    //         name: "John Doe",
    //         age: 30,
    //         salary: 50000,
    //         hobby: {
    //             name: "Reading",
    //             slug: "reading",
    //             image: "book.jpg"
    //         }
    //   })
 
    //   user.save().then(() => {
    //     console.log("Data inserted successfully");

    // }).catch((error) => {
    //     console.error("Error inserting data:", error);
    // });
    // }catch(err){
    //     console.log(err);
    // }
}
