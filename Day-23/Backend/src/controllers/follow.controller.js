const userModel = require('../models/user.model')
const followModel = require("../models/follow.model")
const postModel = require('../models/post.model')
const likeModel = require('../models/like.model')

async function followController(req, res){
    
    const follower = req.params.username
    const following = req.user.username

    if(follower === following){
        return res.status(401).json({
            message:'you cannot follow yourself'
        })
    }

    const isUserExist = await userModel.findOne({
        username:follower
    })

    if(!isUserExist){
        return res.status(404).json({
            message:'user not exist to follow'
        })
    }

    const followReport = await followModel.create({
        follower:req.user.username,
        following:req.params.username
    })

    res.status(201).json({
        message:`now you are following ${follower}`,
        followReport
    })

    
}

async function likeController(req, res){

    const postId = req.params.postId

    const isPostExist = await postModel.findById(postId)

    // is post exist or not
    if(!isPostExist){
        return res.status(401).json({
            message:"post not found"
        })
    }

    // post already liked or not
    const isAlreadyLiked = await likeModel.find({
        $and:[{post:postId},{user:req.user.username}]
    })
    // if post already liked then return from here 
    if(isAlreadyLiked){
        return res.status(404).json({
            message:'you already liked this post'
        })
    }

    // creating post into database
    const post = await likeModel.create({
        post:postId,
        user:req.user.username
    })

    res.status(200).json({
        message:'post liked successfully',
        post
    })
    
}

module.exports = {followController,likeController}