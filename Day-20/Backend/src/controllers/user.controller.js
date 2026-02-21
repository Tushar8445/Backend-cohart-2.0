const userModel = require('../models/user.model')
const followModel = require('../models/follow.model')
const postModel = require('../models/post.model')
const likeModel = require('../models/like.model')

async function followUserController(req,res){
    const followeeUsername = req.params.username  // jise follow kar raha hun 
    const followerUsername = req.user.username    // jo follow kar raha hai i mean user


    if(followerUsername == followeeUsername){
        return res.status(400).json({
            message:'you cannot follow yourself'
        })
    }

    const isFolloweeExist = await userModel.findOne(
        {username:followeeUsername}
    )
    if(!isFolloweeExist){
        return res.status(403).json({
            message:"User Not Exist to follow"
        })
    }

    const duplicateFollow = await followModel.findOne({
        follower:followeeUsername,
        following:followerUsername
    })
    if(duplicateFollow){
        return res.status(403).json({
            message:'you already followed this user'
        })
    }

    const followRecord = await followModel.create({
        follower:followerUsername,
        following:followeeUsername
    })

    res.status(201).json({
        message:`you are following ${followeeUsername}`,
        follow:followRecord
    })
}

async function unfollowUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne(
        {
            follower:followerUsername,
            following:followeeUsername
        }
    )
    if(!isUserFollowing){
        return res.status(403).json({
            message:`you are not following this user ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message:`you have unfollowed ${followeeUsername}`
    })
}

async function likeUserController(req, res){

    const postId = req.params.postId
    const username = req.user.username


    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:'no post Found'
        })
    }

    const likeRecord = await likeModel.create({
        post:postId,
        user:username
    })
    res.status(200).json({
        message:'User Liked successfully',
        likeRecord
    })
}

module.exports = {followUserController,unfollowUserController, likeUserController}