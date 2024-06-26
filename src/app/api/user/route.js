import { con } from "@/app/lib/db";
import mongoose from "mongoose";
import { User } from "@/app/lib/model/user"
import { UserVarification } from "@/app/lib/model/userVerify";
import { NextRequest, NextResponse } from "next/server";


// email varifies
import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid'
// email author details

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "64f3be8f066ec2",
    pass: "f600fe9e071379"
  }
});
// const transporter = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "64f3be8f066ec2",
//     pass: "f600fe9e071379"
//   }
// });


// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});


const sendVarifiactionEmail = async ({ _id, email },req, res) => {
  
  const {origin}=new URL(req.url)
  console.log("-----",origin);
  // const url = "http://localhost:3000/";
  const uniqueString = uuidv4() + _id;
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify user Email",
    html: `<p>Varify Your Email Address to complete the signup or login your account.</p> <p>This link is expires in 6 hours<br />.</p>
    <p>Press <a href=${origin + "/user/verify/" + _id + "/" + uniqueString}>here </a> to proceed.</p>`,
  }
  const expirationTime = new Date(Date.now() + 21600000);
  const newVerification = await UserVarification.create({
    userId: _id,
    uniqueString: uniqueString,
    createdAt: Date.now(),
    expiresAt: expirationTime,
  })
  try {
    await newVerification.save();
    await transporter.sendMail(mailOptions)
    return NextResponse.json({
      status: "pending",
      message: "Verification Mail Send"
    })

  } catch (err) {
    console.log(err, "verification failed");

  }

}


export async function POST(request, res) {
  await mongoose.connect(process.env.MONGODB)
  const payload = await request.json();
  let role = payload.role.trim();
  let email = payload.email.trim();
  // let varify=payload.varify.trim();

  if (role == '' || email == '') {
    return NextResponse.json({
      status: "FAILED",
      message: "invalid user details"
    })
  }
  if (request.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  console.log("payload", payload);
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
      // return res.status(400).json({ message: 'Email already registered' });
      return NextResponse.json({ message: 'Email already registered',success:false });
  }
  else{

  let user = new User({
    role: role,
    email: email,
    varified: false
  })
  
  const result = await user.save();
  sendVarifiactionEmail(result,request, res);
  // await user.save();
  return NextResponse.json({ result, success: true })
  }
}