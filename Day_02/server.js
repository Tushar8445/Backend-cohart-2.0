const express = require('express')

const app = express() // instance create hogya

app.listen(3000) // server start krna 

app.get('/notes',(req,res)=>{
    res.send('Hello JI apka server Start ho gya')
})

