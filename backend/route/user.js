
import express from "express"
import { userSignUp } from "../controller/auth"

const route = express.Router()

route.get('/api/users',userSignUp)

export default route


