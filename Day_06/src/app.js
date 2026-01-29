const express = require("express")

const app = express()

app.get("/notes",(req,res)=>{
    res.send("Hello Server jiiii");
})

module.exports = app