const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true, "Username is required"],
        unique:true
    },
    email:{
        type:String,
        require:[true,"email is required"],
        unique:[true, "email Already exist"], 
    },
    password:{
        type:String,
        require:[true,"password is required"],
    },
    bio:String,
    profileImage:{
        default:"https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp",
        type:String
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel