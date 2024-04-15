import { con} from "@/app/lib/db";
import mongoose from "mongoose";
import {User} from "@/app/lib/model/user"
import { UserVarification } from "@/app/lib/model/userVerify";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto'

// email varifies
import nodemailer from 'nodemailer'
import {v4 as uuidv4} from 'uuid'
// email author details

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "64f3be8f066ec2",
    pass: "f600fe9e071379"
  }
  });


// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });


const sendVarifiactionEmail=async({_id,email},res)=>{
  console.log("call",_id,email);
  const url="http://localhost:3000/";
  const uniqueString=uuidv4() + _id;
  const mailOptions={
    from :process.env.AUTH_EMAIL,
    to:email,
    subject:"Verify user Email",
    html: `<p>Varify Your Email Address to complete the signup or login your account.</p> <p>This link is expires in 6 hours<br />.</p>
    <p>Press <a href=${url+"user/verify/"+_id+"/"+uniqueString}>here </a> to proceed.</p>`,   
  }

  const newVerification= await UserVarification.create({
    userId:_id,
    uniqueString: uniqueString,
    createdAt:Date.now(),
    expiresAt:Date.now()+21600000,
  })
  try{
    await newVerification.save(); 
    await transporter.sendMail(mailOptions)
    Response.json({
        status:"pending",
        message:"Verification Mail Send"
    })

  }catch(err){
    console.log(err,"verification failed");

  }
  
}


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
    let user=new User({
      role:role,
      email:email,
      varified:false
    })

    const result=await user.save();
    console.log("result",result);
    sendVarifiactionEmail(result,res);
    return NextResponse.json({result,success:true})
}