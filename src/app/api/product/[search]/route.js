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

export async function GET(request){
    try{
        await authenticateToken(request)
      
        const { searchParams } = new URL(request.url)
        const brand=searchParams.get('brand');
        const tag=searchParams.get('tag');
        const min_price=searchParams.get('min_price')
        const max_price=searchParams.get('max_price')
        console.log(brand,tag,min_price,max_price);
        const res = await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        let query = {};
        if(brand){
            query.brand = brand;
        }
        if(min_price & max_price){
            query.min_price={$gte:min_price};
            query.max_price={$lte:max_price};
        }
        if(tag?.length>0){
            query.tag={$in:[tag]};
        }

        const result = await Product.find(query);
        console.log("data fetched",result);
        return NextResponse.json("hii finding records",result)

    }catch(err){
        console.log(err);
    }
}