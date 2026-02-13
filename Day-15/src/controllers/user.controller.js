const userModel = require('../models/user.model')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

async function registerController (req,res){
    
    const {username, email, password, bio, profileImage} = req.body
    
    const IsUserExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(IsUserExist){
        return res.status(400).json({message:"User already exist"})
    }

    const hash = await bcrypt.hash(password,10)


    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImage
    })

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie('token',token)

    res.status(200).json({
        message:"User Register Successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage :user.profileImage
        }
    })    
}


async function loginController(req,res){
    const {username, email , password} = req.body

    const user = await userModel.findOne({
        $or:[{email},{username}]
    })

    if(!user){
        return res.status(404).json({
            message:"no user found with this email or password"
        })
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(404).json({
            message:"Invalid Password. "
        })
    }

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token", token)

    res.status(200).json({
        message:"User LoggedIN Successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })

}

module.exports ={
    registerController,
    loginController
}