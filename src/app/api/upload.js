import { NextResponse } from "next/server";
import { Image } from "@/app/lib/model/image";
import mongoose from "mongoose";

export default upload.single('image'), async (req, res) => {
    try {
      const newImage = new Image();
      newImage.img.data = fs.readFileSync(req.file.path);
      newImage.img.contentType = 'image/jpeg'; // Adjust the contentType according to the uploaded file type
      await newImage.save();
      fs.unlinkSync(req.file.path);
      res.status(200).json({ _id: newImage._id });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  };