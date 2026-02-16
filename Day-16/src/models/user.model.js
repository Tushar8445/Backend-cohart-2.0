const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "username is required to register"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/oazh75z1lj/defaultProfileImage.webp"
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel