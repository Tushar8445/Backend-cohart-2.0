/**
 * server create krna 
 * server ko config krna
 */

const express = require('express')

const noteModel = require('./models/note.model')

const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())


/**
 * POST /api/notes
 * it will create note data into database 
 */ 

app.post('/api/notes',async (req,res)=>{
    const {title , description} = req.body

    const note = await noteModel.create({
        title,description
    })

    res.status(201).json({
        message:"Note Created Successfully.",
        note
    })
})

/**
 * GET Method 
 * it will get the data from database
 */

app.get("/api/notes", async (req,res)=>{
   const note = await noteModel.find()

   res.status(200).json({
    message:"Note Fetched Successfully.",
    note
   })
})

/**
 * Delete api
 * It will delete the data form database
 * /api/notes/:index
 */

app.delete('/api/notes/:id', async(req,res)=>{
    const id  = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Note Deleted Successfully."
    })
})

app.patch('/api/notes/:id',async (req,res)=>{
    const id = req.params.id

    const {description} = req.body

    await noteModel.findByIdAndUpdate(id,{description})

    res.status(201).json({
        message:"Note Updated Successfully"
    })


})


module.exports = app



