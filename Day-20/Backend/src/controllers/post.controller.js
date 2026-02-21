const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const likeModel = require("../models/like.model")


const imagekit = new ImageKit({
    privateKey: process.env.IMAGE_PRIVATE_KEY
})


async function createPostController(req, res) {
    


    const file = await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"TestFile",
        folder:'cohart-two'
    })

    const post = await postModel.create({
        caption:req.body.caption,
        ImgUrl:file.url,
        user:req.user.id
    })

    res.status(201).json({
        message: "Post created successfully.",
        post
    })
}


async function getPostsController(req, res) {
   

    const posts = await postModel.find({
        user: req.user.id
    })

    res.status(200)
        .json({
            message: "Posts fetched successfully.",
            posts
        })
}

async function getPostDetailsController(req, res){

    const userId = req.user.id
    const postId = req.params.postId 

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:'No post Found'
        })
    }

    const isUserValid = (post.user).equals(userId)

    if(!isUserValid){
        res.status(403).json({
            message:'forbidden content'
        })
    }

    res.status(200).json({
        message:'Post fetch successfully'
    })
    
}

async function likePostController(req,res){
    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:'No post Found'
        })
    } 

    const likeRecord = await likeModel.create({
        user:userId,
        post:postId
    }) 
    
    res.status(200).json({
        message:'Post liked successfully',
        like:likeRecord
    })
}


module.exports = {createPostController, getPostsController,getPostDetailsController, likePostController}