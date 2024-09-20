import { pool } from "../db/postgres"


export const adminLogin = async (req, res) => {
    const { email, password } = req.body
    const hashPassword = await pool.query(`
        SELECT email,password,name,isAdmin from users WHERE email ='${email}'
        `)
    if (password !== hashPassword && isAdmin)
        res.status(200).json({ message: "admin login success" })
}