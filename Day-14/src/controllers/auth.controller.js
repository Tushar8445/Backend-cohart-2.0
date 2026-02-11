const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const crypto  = require('crypto')


async function registerController(req,res){
    const {username, email, password, bio, profileImage} = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExist){
        return res.status(404).json({
            message:"User Already exist" + (isUserAlreadyExist.email == email ? "email Already exist":"Username Already Exist")
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

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

    res.status(201).json({
        message: "User Registered successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })

}

async function loginController(req,res){
    
    // data aya form frontend 
    const {username, email, password} = req.body


    // find user form database 
    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    // check kro user hai ya nahi database me 
    if(!user){
        return res.status(404).json({
            messgae:"User not Found you entered wrong email or password"
        })
    }

    // yha password ko bcrypt kar rahe hai 
    const hash = crypto.createHash('sha256').update(password).digest('hex')

    // check kro frontend se jo password aya hai vo database wale se match ho raha hai ya nahi 
    const isPasswordValid = hash == user.password

    // agar match nahi ho raha tab return kro invalid password 
    if(!isPasswordValid){
        return res.status(404).json({
            message:"Invalid Password..."
        })
    }
    
    // agar password sab cheeje sahi hai to token create kro
    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    // token ko cookie me set kro 
    res.cookie('token',token)

    // if everythig is oky then user ko login karao 
    res.status(201).json({
        message:"User LoggedIn Successfully",
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