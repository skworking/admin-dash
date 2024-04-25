import { NextResponse } from "next/server";
import { Image } from "@/app/lib/model/image";
import mongoose from "mongoose";
import { writeFile } from 'fs/promises';
import { buffer } from 'buffer';



export async function POST(request) {
  try{
    await mongoose.connect(process.env.MONGODB)
  
    const data = await request.formData();
    console.log("00000",data);
    const file = data.get('file');
    console.log("data",file);
    if (!file) {
      return NextResponse.json({Success:false,status:400})
    }
    
    const bytes = await file.arrayBuffer();
    const newImage = new Image({
      image: {
        data: Buffer.from(bytes),
        contentType: file.type
      }
    });
    const res= await newImage.save();
    const path = `./public/Images/${file.name}`;
    
    await writeFile(path, Buffer.from(bytes));
    console.log("response---",res);
    return NextResponse.json ({
      status: 200,
      success: true,
      result:res,
    });
  }catch(err){
    console.log(err);
  }
  }


  export async function PUT(request) {
    const data = await request.formData();
    const file = data.get('file');
    const fileName = data.get('fileName'); // Assuming you provide the fileName as part of the PUT request
    console.log("data",file,fileName);
    if (!file ) {
        return NextResponse.json({ success: false, message: 'File or fileName is missing' });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join('./public/Images', file.name);

    try {
        await writeFile(path, buffer);
        console.log(`File ${path} has been successfully updated.`);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating file:', error);
        return NextResponse.json({ success: false, message: 'Error updating file' });
    }
}

