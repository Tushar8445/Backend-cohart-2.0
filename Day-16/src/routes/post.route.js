const express = require('express')
const postController = require('../controllers/post.controller')
const postRouter = express.Router()
const multer = require('multer')
const {createPostController ,getPostController, getPostDetails} = require('../controllers/post.controller')
const identifyUser = require('../middlewares/auth.middleware')
const upload = multer({storage:multer.memoryStorage()})



postRouter.post('/post',upload.single('image') ,createPostController)

postRouter.get('/get',identifyUser,getPostController)

postRouter.get('/details/:postId',identifyUser,getPostDetails)

// postRouter.get('/get',createPostController)

module.exports = postRouter


