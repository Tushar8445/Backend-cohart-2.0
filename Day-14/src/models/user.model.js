const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"user Already Exist"],
        require:[true, "username is required"]
    },
    email:{
        type:String,
        unique:[true,"User already exist with this email"],
        require:[true, "email is required"]
    },
    password:{
        type:String,
        require:[true,"password is required"]
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp"
    }
})

const userModel = mongoose.model("users",userSchema);

module.exports = userModel