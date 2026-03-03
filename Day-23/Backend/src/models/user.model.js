const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "username is required"]
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'email is required']
    },
    password:{
        type:String,
        required:[true, 'password is required'],
    },
    boi:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/oazh75z1lj/defaultProfileImage.webp?updatedAt=1771071970731"
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel