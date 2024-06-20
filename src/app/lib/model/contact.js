import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema({
    title: String,
    content: String,
});
export const Contact=mongoose.models.Contact || mongoose.model("Contact",ContactSchema);