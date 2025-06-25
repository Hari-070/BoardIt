const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const bcrypt = require('bcryptjs')
require('dotenv').config()


exports.signup=async(req,res)=>{
    try {
        const {name, email, password}=req.body
        const mail=await User.findOne({email})
        if(mail){
            return res.status(400).json("User already Exists")
        }
        const hashPass=await bcrypt.hash(password,10)
        const newUser=new User({
            name,
            email,
            password:hashPass
        })
        await newUser.save()
        
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})

        return res.status(201).json({message:"user created succefully",newUser,token})
    } catch (error) {
        console.log(error)
        console.log("there is an error to solve in signup")
    }
}

exports.login=async(req,res)=>{
    try {
        const {email,password } = req.body;
        const user = await User.findOne({ email });
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})

        return res.status(200).json({token,user,message:"logined succesfully",username:user.name})
    } catch (error) {
        console.log(error)
        console.log("there is an error to solve in login")
    }
}