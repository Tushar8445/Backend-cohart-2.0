require('dotenv').config()
const express = require('express')
const authRouter = require('./routes/auth.route')
const postRouter = require('./routes/post.route')

const app = express() 
app.use(express.json())
app.use('/auth/api',authRouter)
app.use('/post/api',postRouter)

module.exports = app 