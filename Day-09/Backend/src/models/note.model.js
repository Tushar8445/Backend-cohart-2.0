
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title:String,
    description:String,
})

// const cardSchema = new mongoose.Schema({
//     holder:String,
//     cardNumber : Number,
// })

const noteModel = mongoose.model("notes", noteSchema)

module.exports = noteModel