import { con} from "@/app/lib/db";
import mongoose from "mongoose";
import {User} from "@/app/lib/model/user"
import { NextRequest, NextResponse } from "next/server";

// email varifies
// import nodmailer from 'nodemailer'
// import {v4 as uuidv4} from 'uuid'

export async function POST(request,res){
    await mongoose.connect(con)
    const payload=await request.json();
    let role=payload.role.trim();
    let email=payload.email.trim();
    // let varify=payload.varify.trim();

    if(role == ''|| email == ''){
      return NextResponse.json({
            status:"FAILED",
            message:"invalid user details"
        })
    }

    console.log("payload",payload);
    let user=new User(payload)

    const result=await user.save();
    return NextResponse.json({result,success:true})
}