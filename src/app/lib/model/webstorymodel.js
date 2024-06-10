import mongoose from 'mongoose';
const pageSchema =new mongoose.Schema({
  imgSrc: { type: String, required: true },
  heading: { type: String, required: true }
})
const StorySchema=new mongoose.Schema({
   
  title: { type: String, required: true },
  date: { type: Date, required: true },
  thumbnail: { type: String, required: true },
  publisherLogoSrc: { type: String, required: true },
  pages: [pageSchema]
})
export const Story = mongoose.models.story||mongoose.model('story', StorySchema);