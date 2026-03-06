const express = require('express')
const {followController, likeController} = require('../controllers/follow.controller')
const checkUser = require('../middleware/auth.middleware')

const followRouter = express.Router()

followRouter.post('/follow/:username',checkUser,followController)
followRouter.post('/like/:postId',checkUser,likeController)

module.exports = followRouter