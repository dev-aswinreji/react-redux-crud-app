import { pool } from "../db/postgres.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export const userSignUp = async (req, res) => {
    try {

        const { name, email, password } = req.body
        const isExist = await pool.query(`
        SELECT email from users WHERE email='${email}'
        `);

        if (isExist.rows[0]?.email) {
            return res.status(409).json({ result: "Email already exist" })
        }

        if (!name || !email || !password) {
            return res.status(400).json({ result: "provided information is not correct" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, hashPassword]
        );

        res.status(201).json({ message: "account created successfully" })

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
        console.log(error, 'Error in post method');
    }

}

export const userSignIn = async (req, res) => {
    try {
        const { email, password } = req.body

        const jwtSecretKey = process.env.JWT_SECRET_KEY

        const user = await pool.query(`
            SELECT userid,name,password from users WHERE email='${email}';
            `)

        const hashPassword = await bcrypt.compare(password, user.rows[0]?.password)
        if (!hashPassword) {
            return res.status(401).json({ error: "Authentication failed" })
        }

        const token = jwt.sign({ userid: user.rows[0].userid, name: user.rows[0].name }, jwtSecretKey, {
            expiresIn: '1hr',
        })

        res.status(200).json({ token ,user:{ userid: user.rows[0].userid, name: user.rows[0].name }})
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const userHome = async (req, res) => {

    const { userid, name } = req.user

    res.status(200).json({ message: "Protected route accessed", user: {userid,name}})
}