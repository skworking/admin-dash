import mongoose from 'mongoose'
const Schema=mongoose.Schema;

const UserVerifySchema=new Schema({
    userId:String,
    uniqueString:String,
    createdAt:Date,
    expiresAt:Boolean
})
export const UserVarification=mongoose.models.user || mongoose.model("user",UserVerifySchema);
