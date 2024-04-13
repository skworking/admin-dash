import mongoose from 'mongoose'
const Schema=mongoose.Schema;

const UserVerifySchema=new Schema({
    userId:String,
    uniqueString:String,
    createdAt:Date,
    expiresAt:Boolean
})
const UserVarification=mongoose.model('user',UserVerifySchema);
module.exports= UserVarification;