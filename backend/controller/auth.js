import { pool } from "../db/postgres.js";
import bcrypt from "bcrypt"

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

        const hashPassword = await bcrypt.hash(password,10)
        await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, hashPassword]
        );

        res.status(201).json({ result: "account created successfully" })

    } catch (error) {
        res.status(500).json({ error, result: "Internal Server Error" })
        console.log(error, 'Error in post method');
    }

}

export const userSignIn = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}