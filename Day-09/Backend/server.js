/**
 * WOrk of this file 
 * 1. server start krna 
 * 2. database se connect krna
*/

const app = require('./src/app')

const connectToDb = require('./src/config/database')


connectToDb()

app.listen(3000,()=>{
    console.log("Server is Running on port 3000")
})