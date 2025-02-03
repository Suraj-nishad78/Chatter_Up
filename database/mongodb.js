
import mongoose from "mongoose";
import dotenv  from 'dotenv'
dotenv.config()

export const connectToDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGOSERVER)
        console.log('Database connected ✅')
    } catch(err){
        console.log("Error while connecting to DB: ", err);
    }
}