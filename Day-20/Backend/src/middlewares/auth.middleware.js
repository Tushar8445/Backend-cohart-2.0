const jwt = require('jsonwebtoken')

async function checkUser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:'invalid token, unauthorized access'
        })
    }
    let decoded = null
    try{
       decoded =  jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message:'User not Authorized'
        })
    }
    req.user = decoded

    next()
}

module.exports = checkUser