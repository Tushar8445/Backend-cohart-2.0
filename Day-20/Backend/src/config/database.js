const mongoose = require('mongoose')

async function connectToDb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected To Database")
    })
}

module.exports = connectToDb