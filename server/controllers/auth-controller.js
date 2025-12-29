import User from '../models/user-model.js'
import bcrypt from 'bcryptjs'

//home controller
const home = async (req,res) =>{
    try {
        res.status(200).send("welcome to the harhal patel by the router")
        
    } catch (error) {
        console.log(error)
        
    }
}

//register controller
const register = async(req,res) =>{
    try {
        const {username,email,phone,password} = req.body
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:"user already exists"})
        }
        const user = await User.create({
            username,
            email,
            phone,
            password
        })
        if(user){
            res.status(201).json({message:"user created successfully",token: await user.generateToken(),userId : user._id.toString()})
        }else{
            res.status(400).json({message:"invalid user data",})
        }
    } catch (error) {
        //res.status(500).json({message:"server error",error: error.message})
        next(error)
        
    }
}

//login controller
const login =async(req,res)=>{
    try {
        const {email,password} =req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"invalid email or password"})
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(isPasswordValid){
            res.status(200).json({message:"login successful",token: await user.generateToken(),userId : user._id.toString()})
        }else{
            res.status(400).json({message:"invalid email or password"})
        }
    } catch (error) {
        console.log(error)
    }
}

// to send user data
const user = async(req,res) =>{
    try {
        const userData = req.user;
        if(!userData){
            return res.status(400).json({message:"user data not found"})
        }
        res.status(200).json({userData})
    } catch (error) {
        console.log(`error in fetching user data: ${error}`)
        
    }
}

export default {home,register,login,user}