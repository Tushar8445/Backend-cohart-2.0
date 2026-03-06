const mongoose = require('mongoose')

const followSchema  = new mongoose.Schema({
    following:String,
    follower:String,
},
{timestamps:true}
)
followSchema.index({follower:1, following:1},{unique:true})


const followModel = mongoose.model("follows",followSchema)

module.exports = followModel