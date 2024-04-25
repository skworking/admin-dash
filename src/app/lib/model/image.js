import mongoose from 'mongoose'
const Schema=mongoose.Schema;

const imageSchema = new Schema({
    image: {
      data: Buffer,
      contentType: String
    }
})
export const Image=mongoose.models.image || mongoose.model("image",imageSchema);