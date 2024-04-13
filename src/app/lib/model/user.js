import mongoose from 'mongoose'
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    role:String,
    email:String,
    varified:Boolean
})
export const User=mongoose.models.user || mongoose.model("user",UserSchema);