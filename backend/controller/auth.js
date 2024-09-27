import { pool } from "../db/postgres.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export const userSignUp = async (req, res) => {
    try {

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ result: "provided information is not correct" })
        }

        const isExist = await pool.query(`
        SELECT email from users WHERE email='${email}'
        `);

        if (isExist.rows[0]?.email) {
            return res.status(409).json({ result: "Email already exist" })
        }



        const hashPassword = await bcrypt.hash(password, 10)
        await pool.query(
            'INSERT INTO users (name, email, password,auth,isadmin) VALUES ($1, $2, $3, $4, $5)',
            [name, email, hashPassword,true,false]
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
                    
        if (!email || !password) {
            return res.status(400).json({ result: "provided information is not correct" })
        }
        console.log(password, 'pass');
        const jwtSecretKey = process.env.JWT_SECRET_KEY

        const user = await pool.query(`
            SELECT userid,name,password,auth from users WHERE email='${email}';
            `)
        if(!user.rows[0]){
            return res.status(404).json({error:"Invalid credentials"})
        }
        if (!user.rows[0].auth) {
            return res.status(401).json({ error: "Authentication failed" })
        }
        console.log(user, 'user is here');
        const hashPassword = await bcrypt.compare(password, user.rows[0]?.password)
        console.log(hashPassword, 'hashedPass');
        if (!hashPassword) {
            return res.status(401).json({ error: "Authentication failed" })
        }

        const token = jwt.sign({ id: user.rows[0].userid }, jwtSecretKey, {
            expiresIn: '1hr',
        })
        console.log(token, 'token');
        res.status(200).json({ token, id: user.rows[0].userid })
    } catch (error) {
        console.log(error, 'Error In userSignin');
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const userHome = async (req, res) => {
    try {
        console.log("inside home");
        console.log(req.user, 'req.user is here');
        const { id } = req.user
        console.log(id, 'id is here');
        const userData = await pool.query(`
        SELECT userid,name,email from users WHERE userid='${id}';
        `)
        res.status(200).json({ message: "Protected route accessed", userData: userData.rows[0] })

    } catch (error) {
        console.log(error, 'Error in userHome');
        res.status(500).json({ error: "internal server error" })
    }
}

