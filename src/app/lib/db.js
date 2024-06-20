// const {username,password}=process.env;
// export const con="mongodb+srv://satish:"+password+"@cluster0.7stdrez.mongodb.net/backend?retryWrites=true&w=majority&appName=Cluster0"

import mongoose from "mongoose";

const connection = {};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGODB);
    connection.isConnected = db.connections[0].readyState;
    console.log(db.connections[0].readyState);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
