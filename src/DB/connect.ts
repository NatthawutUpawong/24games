import mongoose from "mongoose";

 export default async function  dbConnect() {
    await mongoose.connect(String (process.env.MONGODB_URL))
    console.log("MongoDB Connecte Successfully... ")
 }