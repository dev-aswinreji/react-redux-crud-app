import { pool } from "../db/postgres.js"

export const adminHome = async (req, res) => {
    res.status(200).json({ message: "Admin approved" })
}

export const usersList = async (req, res) => {
    const usersList = await pool.query(`
        SELECT * FROM users WHERE isadmin = false;
        `)
    res.status(200).json({ usersList: usersList.rows })
}


export const block = async (req, res) => {

    try {

        const { email } = req.body
        console.log(email, 'Email');

        const updatedUser = await pool.query(`
        UPDATE users
        SET auth = false
        WHERE email = '${email}';
        `)
        console.log(updatedUser, 'hehe');

        if (updatedUser.command === 'UPDATE') {
            res.status(200).json({ message: "user has been successfully blocked" })
        }

    } catch (error) {
        console.log(error, "block error");
        res.status(500).json({ error: "Internal server error" })
    }
}


export const unblock = async (req, res) => {
    try {
        const { email } = req.body

        const updatedUser = await pool.query(`
        UPDATE users 
        SET auth = true
        WHERE email = '${email}';
        `)
        if(updatedUser.command === 'UPDATE'){
            res.status(200).json({message:"user has been successfully unblocked"})
        }
    } catch (error) {
        console.log(error, 'Error in unblock ');
        res.status(500).json({ error: "Internal server error" })
    }
}