const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    ImageUrl:{
        type:String,
        require:[true,"image url is required for creating a post"]
    },
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        require:[true,"User id is required for creating a post"]
    }

})

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel