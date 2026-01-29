/*
        WOrk of this file 
        1. server ko start krna 
        2. apne express server ko database se connect krna
*/

const app = require('./src/app')

const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://tusharsherwal065_db_user:Tushardb123@cluster0.eeoafli.mongodb.net/day-06")
    .then(function(){
        console.log("Connected to Database");
    })
}

connectToDb()

app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000")
})