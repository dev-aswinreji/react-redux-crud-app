
import express from "express"
import { userSignUp } from "../controller/auth.js"

const route = express.Router()

route.post('/api/users',userSignUp)

export default route


