import jwt from "jsonwebtoken";
import { pool } from "../db/postgres.js"
import bcrypt from 'bcrypt';


export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const adminData = await pool.query(`
        SELECT email,password,name,userid,isadmin from users WHERE email ='${email}'
        `)

        if (!adminData.rows[0]) {
            return res.status(401).json({ error: "invalid entry" })
        }
        const adminPassword = adminData.rows[0]?.password
        if (!adminPassword)
            return res.status(401).json({ error: "invalid entry" })

        const hashPassword = await bcrypt.compare(password, adminPassword)
        const isAdmin = adminData.rows[0]?.isadmin

        if (hashPassword && isAdmin) {
            const token = jwt.sign({ id: adminData.rows[0]?.userid }, process.env.JWT_SECRET_KEY, { expiresIn: '1hr' })
            return res.status(200).json({ token: token, id: adminData.rows[0]?.userid })
        }
        res.status(401).json({ error: "invalid entry" })

    } catch (error) {
        console.log(error, 'admin login page');
        res.status(500).json({ error: "Internal server error" })
    }
}