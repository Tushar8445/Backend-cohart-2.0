const express = require('express')
const ImageKit = require('@imagekit/nodejs')
const  {toFile} = require('@imagekit/nodejs')
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})
const postModel = require('../models/post.model')
const jwt = require('jsonwebtoken')


const client = new ImageKit({
    privatekey:process.env.IMAGEKIT_PRIVATE_KEY
})

const postRouter = express.Router()

postRouter.post('/create',upload.single('image'),async (req, res)=>{

    console.log(req.cookies.token)

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:'invalid token'
        })
    }

    let decoded = null
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)

    }catch(err){
        return res.status(401).json({
            message:'User not Authorized'
        })
    }
    req.user = decoded

    console.log(req.file)

    if(!req.file){
        return res.status(404).json({
            message:'image is required'
        })
    }

    const file = await client.files.upload({
        file:await toFile(Buffer.from(req.file.buffer)),
        fileName:"test file",
        folder:'cohart-two'
    })


    const post = await postModel.create({
        caption:req.body.caption,
        Img:file.url,
        user:req.user.id
    })

    res.status(200).json({
        message:"post created successfully",
        post
    })
})

module.exports = postRouter