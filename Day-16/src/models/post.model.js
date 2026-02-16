const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:[true,'image url is required to create an post']
    },
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "user id is required to create a post"]
    }
})

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel