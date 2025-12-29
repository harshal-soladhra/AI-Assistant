import mongoose from "mongoose"

const contactSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    message:{
        type:String,
        required:true,
    },
})

export default mongoose.model("Contact", contactSchema)