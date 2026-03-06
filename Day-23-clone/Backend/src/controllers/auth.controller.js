const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerController(req,res){
    const {username, email,password, profileImg, bio} = req.body

    // check user is Exist or not 

    const user = await userModel.findOne({
        email:email
    })

    if(user){
       return res.status(404).json({
            message:"user already exist go to Login page"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
        username,
        email,
        password:hash,
        profileImg,
        bio
    })

    const token = jwt.sign(
        {
            id:newUser._id,
            username:newUser.username
        },
        process.env.JWT_SECRET,
        {expiresIn:'1d'}  
    )

    res.cookie("token",token)

    console.log(newUser)

    res.status(200).json({
         message:"User Registered successfully",
        newUser:{
            username:newUser.username,
            email:newUser.email,
            bio:newUser.bio,
            profileImg:newUser.profileImg
        }
    })

}
async function loginController(req,res){
    const {username,email, password} = req.body

    const user = await userModel.findOne({
        $or:[{username},{password}]
    })

    if(!user){
        return res.status(404).json({
            message:"user Not found"
        })
    }
    const isVaildPass = await bcrypt.compare(password, user.password)

    if(!isVaildPass){
        return res.status(401).json({
            message:'Invalid Password'
        })
    }

    const token = jwt.sign(
        {
            id:user._id,
            username:user.username
        },
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie('token',token)

    res.status(200).json({
        message:"User Login successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
        }
    })
}

module.exports = {
    registerController,
    loginController
}