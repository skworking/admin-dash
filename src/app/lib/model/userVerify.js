import mongoose from 'mongoose'
const Schema=mongoose.Schema;

const UserVerifySchema=new Schema({
    userId:String,
    uniqueString:String,
    createdAt:Date,
    expiresAt:String
})
export const UserVarification=mongoose.models.userVar || mongoose.model("userVar",UserVerifySchema);
