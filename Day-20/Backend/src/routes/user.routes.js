const express = require('express')
const {followUserController,unfollowUserController,likeUserController} = require('../controllers/user.controller')
const checkUser = require('../middlewares/auth.middleware')

const userRouter = express.Router()

userRouter.post('/follow/:username',checkUser,followUserController)
userRouter.post('/unfollow/:username',checkUser,unfollowUserController)
userRouter.post('/like/:postId',checkUser,likeUserController)

module.exports = userRouter