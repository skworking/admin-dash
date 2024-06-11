import mongoose from 'mongoose';
const storyAttibute =new mongoose.Schema({
  topHeading:String,
  bottomHeading:String,
  bgColor: String,
  short:String,
  active:{ type: Boolean, default: false },
  navUrl:String,
  imgSrc:String
})
const StorySchema=new mongoose.Schema({
   
  name: String,
  slug:String,
  meta: String,
  lineItems: [storyAttibute]
})
export const Story = mongoose.models.story||mongoose.model('story', StorySchema);