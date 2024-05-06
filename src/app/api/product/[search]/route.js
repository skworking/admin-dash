import { NextResponse } from "next/server";
import { Product } from "@/app/lib/model/products";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import { message } from "antd";

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

export async function GET(request) {
    try {
        await authenticateToken(request)

        const { searchParams } = new URL(request.url)
        const brand = searchParams.get('brand');
        const min = searchParams.get('min_price')
        const max = searchParams.get('max_price')
        const tag = searchParams.get('tag');
        console.log(brand, tag, min, max);
        const res = await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        let query = {};
        // Add brand filter to the query if brand is provided
        if (brand) {
            query.brand = { $in: brand.split(',') }; // Assuming multiple brands can be comma-separated
        }
        // Add min_price and max_price filters to the query if both are provided
        if (min && max) {
            query.min_price = { $gte: parseInt(min) };
            query.max_price = { $lte: parseInt(max) };
        }
        // Add tag filter to the query if tag is provided
        if (tag) {
            query['tag.name'] = { $in: tag.split(',') }; // Assuming multiple tags can be comma-separated
        }
        // console.log("dtaa",query);
        try {
            const result = await Product.find(query)
            if(result.length > 0){

                return NextResponse.json({ result: result, success: true, message: "Record found successfull" })
            }else{
                return NextResponse.json({ result: result, success: true, message: "Record Not  Found" })
            }

        } catch (err) {
            return NextResponse.json({ success: FaLessThanEqual, message: err })
        }
    } catch (err) {
        return NextResponse.json({ message: err, success: false })
    }
}