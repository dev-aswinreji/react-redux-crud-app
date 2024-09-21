
import express from 'express';
import { adminLogin } from '../controller/adminAuth.js';
import { adminHome, block, usersList } from '../controller/adminHome.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const adminRoute = express.Router()

adminRoute.post('/login',adminLogin)
adminRoute.get('/home',verifyToken,adminHome)
adminRoute.get('/userslist',usersList)
adminRoute.post('/block',block)

export default adminRoute