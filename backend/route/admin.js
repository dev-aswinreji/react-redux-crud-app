
import express from 'express';
import { adminLogin } from '../controller/adminAuth.js';
import { adminHome, block, unblock, usersList } from '../controller/adminHome.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const adminRoute = express.Router()

adminRoute.post('/login',adminLogin)
adminRoute.get('/home',verifyToken,adminHome)
adminRoute.get('/userslist',usersList)
adminRoute.post('/block',block)
adminRoute.post('/unblock',unblock)

export default adminRoute