
import express from "express"
import { userHome, userSignIn, userSignUp } from "../controller/auth.js"
import { verifyToken } from "../middleware/authMiddleware.js"

const route = express.Router()

route.post('/api/users',userSignUp)

route.post('/api/users/login',userSignIn)

route.get('/api/users/home',verifyToken,userHome)

export default route


