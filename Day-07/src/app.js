const express = require("express")

const app = express()

app.use(express.json())

app.post('/notes',async (req,res)=>{
    const {title, description} = req.body

    const note = await noteModel.create({
        title,description
    })

    req.status(201).json({
        message:"note created Successfull",
        note
    })
})

module.exports  = app