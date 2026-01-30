/*
    1. server create krna 
    2. server config krna 
*/

const express = require("express")
const noteModel = require("./models/notes.model")
const app = express()

app.use(express.json())

app.post('/notes', async(req,res)=>{
    const {title, description,name} = req.body

    const note = await noteModel.create({
        title,description,name
    })

    res.status(201).json({
        message:"note Created Successfully",
        note
    })
    
})

module.exports = app