const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    ImgUrl:{
        type:String,
        required:[true, "image url is required for a post"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true, "user id is required for creating a post"]
    }
})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel

