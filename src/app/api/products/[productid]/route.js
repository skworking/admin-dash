import { NextResponse } from "next/server";
import { Product } from "@/app/lib/model/products";
import mongoose from "mongoose";
import { con } from "@/app/lib/db";
import jwt from 'jsonwebtoken'

function authenticateToken(req) {
    return new Promise((resolve, reject) => {
        // Get the JWT token from the Authorization header
        const authHeader = req.headers.get('authorization');
        // console.log(authHeader);
        const token = authHeader && authHeader.split(' ')[1];

        // If no token provided, return 401 Unauthorized
        if (!token) {
            reject({ status: 401, message: 'Authentication token is missing' });
        }

        // Verify the token
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                reject({ status: 403, message: 'Invalid token' });
            }
            // If token is valid, resolve with the user
            // resolve(user);
            resolve({ user: decoded, tokenData: decoded });
        });
    });
}


export async function PUT(request,{params}){
    try{
        await authenticateToken(request)
        const userId=params.productid;
        // id object create
        const filter={_id:userId}
        // get data json from user
        const payload=await request.json();
      
        await mongoose.connect(process.env.MONGODB)
    
        const result=await Product.findOneAndUpdate(filter,payload,{ new: true });
        return NextResponse.json({result,success:true})
    }catch(error){
        console.error('Error:', error);
        return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }

}
// search by id
export async function GET(request,{params}){
    try{
    await authenticateToken(request)
    const userId=params.productid;
   
   
    // id object create
    const record={_id:userId}
    // check the connection
    await mongoose.connect(process.env.MONGODB)

    const result=await Product.findOne(record);

    return NextResponse.json({result,success:true})
    }catch(error){
        console.error('Error:', error);
        return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }
}

// export async function DELETE({params}){
//     const userId=params.userid;
//     console.log(userId);
//     const record={_id:userId}
//     console.log(record,userId);
//     // check the connection
//     await mongoose.connect(con)

//     const result=await User.deleteOne(record);
//     return NextResponse.json({result,massage:"Rocord deleted",success:true})
// }

export async function DELETE(request,content){
    try{
        await authenticateToken(request)
        console.log("id",content.params);
        // get id
        const userId=content.params.productid;
        // id object create
        const record={_id:userId}
        // check the connection
        await mongoose.connect(process.env.MONGODB)
        
        const result=await Product.deleteOne(record);
        return NextResponse.json({result,success:true})
    }catch(error){
        console.error('Error:', error);
        return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }
    
}
// export async function DELETE(content){
//     console.log("call this",content);
//     const record={_id:content.userid}
//     console.log(record);
//     // check the connection
//     await mongoose.connect(con)

//     const result=await User.deleteOne(record);
//     return NextResponse.json({result,massage:"Rocord deleted",success:true})
// }