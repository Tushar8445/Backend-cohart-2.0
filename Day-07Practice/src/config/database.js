const mongoose = require('mongoose')

function connectToDb(){
     mongoose.connect(process.env.MONOG_URI).then(()=>{
        console.log('Connected to Database...')
    })
}

module.exports = connectToDb