import mongoose from "mongoose"
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
}, { timestamps: true })

userSchema.pre("save", async function(){
    const user = this
    if(!user.isModified("password")) return
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password,salt)
        user.password = hashedPassword
    } catch (error) {
        throw error
    }
}) 

// json web token
userSchema.methods.generateToken = function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin
        },process.env.JWT_SECRET,{expiresIn:"30d"})
        
    } catch (error) {
        console.log(error)
    }
}

const User = mongoose.model("User", userSchema)
export default User