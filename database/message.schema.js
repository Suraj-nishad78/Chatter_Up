import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    username:String,
    text:String,
    avatar:String,
    timestamp:{
        type:Date,
        default:Date.now
    }
}
)

export const MessageModel = mongoose.model("Message", messageSchema)