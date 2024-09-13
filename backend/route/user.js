
import express from "express"
import { userHome, userSignIn, userSignUp } from "../controller/auth.js"
import { verifyToken } from "../middleware/authMiddleware.js"
import { imageUpload } from "../controller/imageUpload.js"

const route = express.Router()

route.post('/api/users',userSignUp)

route.post('/api/users/login',userSignIn)

route.get('/api/users/home',verifyToken,userHome)
route.post('/api/upload',verifyToken,imageUpload)

export default route


