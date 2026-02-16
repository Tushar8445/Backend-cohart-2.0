const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerController(req,res){
    const {username, email, password, bio,profileImage} = req.body

    const user = await userModel.findOne({
        $or:[{username},{email}]
    })

    if(user){
        return res.status(404).json({
            message:"User Already exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        username:username,
        password:hashedPassword,
        email:email,
        bio,
        profileImage
    })

    res.status(200).json({
        message:"User Registered successfully",
        newUser
    })

}

async function loginController (req,res){
    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or:[{email},{username}]
    })

    if(!user){
        return res.status(404).json({
            message:"User Not Found"
        })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword){
        return res.status(400).json({
            message:"Invalid Password."
        })
    }

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(200).json({
        message:"User logged in succesfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
    
}

module.exports = {
    registerController,
    loginController
}