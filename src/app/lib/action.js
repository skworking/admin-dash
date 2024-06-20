'use server'
import { revalidatePath } from "next/cache"
import { Contact } from "./model/contact"
import { connectToDB } from "./db"



export const addPost=async(formData)=>{
    const { title, content } = Object.fromEntries(formData);
    console.log(title,content);
    try {
      await connectToDB()
        const newPost = new Contact({
          title:"hii",
          content:"dada",
        });
    
        await newPost.save();
      } catch (err) {
        console.log(err);
        throw new Error('Failed to create post!');
      }
    
      revalidatePath('/');
}