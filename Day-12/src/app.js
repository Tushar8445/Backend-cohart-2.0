/**
 * 1. server create krna 
 * 2. cofing krna 
 */

const express = require("express")
const cookieParser = require('cookie-parser')
const authRouter = require('./Routes/auth.route')

const app = express()



app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)





module.exports = app


