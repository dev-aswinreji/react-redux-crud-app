
import express from "express"
import { userHome, userSignIn, userSignUp } from "../controller/auth.js"
import { verifyToken } from "../middleware/authMiddleware.js"
import { imageUpload } from "../controller/imageUpload.js"

const route = express.Router()

route.post('/users',userSignUp)

route.post('/users/login',userSignIn)

route.get('/users/home',verifyToken,userHome)

route.post('/users/upload',imageUpload)

export default route


