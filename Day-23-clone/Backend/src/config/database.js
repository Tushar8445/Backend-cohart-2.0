const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Conncted to mongoDB");
    })
}

module.exports = connectToDb