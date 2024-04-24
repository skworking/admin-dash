import mongoose from 'mongoose'
const Schema=mongoose.Schema;

const imageSchema = new Schema({
    img: {
      data: Buffer,
      contentType: String
    }
})
export const Image=mongoose.models.image || mongoose.model("image",imageSchema);