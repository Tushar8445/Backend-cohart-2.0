const experss = require("express")
const { loginController, registerController } = require("../controllers/user.controller")

const authRouter = experss.Router()



authRouter.post('/register',registerController)
authRouter.post('/login', loginController)


module.exports = authRouter