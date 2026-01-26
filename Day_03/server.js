const express = require("express");

const app = express(); // ye instance create karta hai 

app.listen(3000); // it starts the server

const notes = []

app.get("/", (req ,res)=>{
    res.send("Hello WOrld");
    console.log("server Started...")
})
app.get('/greet',(req,res)=>{
    res.send('Hello Mr: Tushar Sherwal')
})

app.post("/notes",(req,res)=>{
    res.send()
})