const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const authRouter = express.Router()
const crypto = require('crypto')


authRouter.post('/register', async(req,res)=>{
    const {name,email,password} = req.body

    const isUserExist = await userModel.findOne({email})

    if(isUserExist){
       return res.status(400).json({
            error:"Duplicate email..."
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")
    
    const user  = await userModel.create({
        name,email, password:hash
    })
    
    const token =  jwt.sign(
        {
        id:user._id
        },
        process.env.JWT_SECRET
    )
    
    res.cookie("jwt-token",token)
    
    res.status(200).json({
        message:"User Created Successfully",
        user,
        token
    })
})


authRouter.post('/protected',(req,res)=>{
    console.log(req.cookies)

    res.status(200).json({
        message:"this is a protected route"
    })
})

authRouter.post('/login',async (req, res)=>{
    const {email,password} = req.body
    
    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"user not found with this email"
        })
    }

    const isPasswordCorrect = user.password == crypto.createHash("md5").update(password).digest("hex")

    if(!isPasswordCorrect){
        return res.status(401).json({
            message:"Incorrect Password!!!"
        })
    }

    const token = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt-token",token)

    res.status(200).json({
        message:"User logged in Succesfully",
        user
    })
})



module.exports = authRouter

