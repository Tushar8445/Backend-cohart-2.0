require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth.routes')
const postRouter = require('./routes/post.route')


const app = express() // express ko hamne app me store kr liya mtlb ki ab ham app ka use krke kch bhi kar satke hai 
app.use(cookieParser())
app.use(express.json())
app.use('/auth/api',authRouter)
app.use('/post/api',postRouter)


module.exports = app
