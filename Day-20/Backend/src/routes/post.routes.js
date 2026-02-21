const express = require('express')
const {createPostController, getPostsController, getPostDetailsController,likePostController} = require('../controllers/post.controller')
const multer = require('multer')
const checkUser = require('../middlewares/auth.middleware')
const upload = multer({storage:multer.memoryStorage()})

const postRouter = express.Router()


postRouter.post('/post',upload.single('image'),checkUser,createPostController)
postRouter.get('/get',checkUser,getPostsController)
postRouter.get('/details/:postId',checkUser,getPostDetailsController)
postRouter.post('/like/:postId',checkUser,likePostController)

module.exports = postRouter