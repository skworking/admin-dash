import { NextResponse } from "next/server";
import { Image } from "@/app/lib/model/image";
import mongoose from "mongoose";
import { writeFile } from 'fs/promises';
import { buffer } from 'buffer';
import { v4 as uuidv4 } from 'uuid';


export async function POST(request) {
    const data = await request.formData();
    const file = data.get('file');
    
    if (!file) {
      return {
        status: 400,
        body: JSON.stringify({ success: false })
      };
    }
    
    const bytes = await file.arrayBuffer();
    const path = `./public/Images/${uuidv4()}-${file.name}`;
    
    await writeFile(path, Buffer.from(bytes));
    console.log(`open ${path} to see the uploaded file`);
    
    return NextResponse.json ({
      status: 200,
      body: JSON.stringify({ success: true })
    });
  }