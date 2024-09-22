import { pool } from "../db/postgres.js"

export const adminHome = async (req, res) => {
    try {

        res.status(200).json({ message: "Authorization approved" })

    } catch (error) {
        console.log(error, 'Error in admin home');
    }
}

export const usersList = async (req, res) => {
    try {

        const usersList = await pool.query(`
        SELECT * FROM users WHERE isadmin = false;
        `)

        res.status(200).json({ usersList: usersList.rows })

    } catch (error) {

        console.log(error, 'Error in users list');
        res.status(500).json({ error: "Internal server error" })
    }
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

        if (updatedUser.command === 'UPDATE' && updatedUser.rowCount === 1) {
            return res.status(200).json({ message: "user has been successfully blocked" })
        }

        res.status(404).json({ error: "user not found" })

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

        if (updatedUser.command === 'UPDATE' && updatedUser.rowCount === 1) {
            return res.status(200).json({ message: "user has been successfully unblocked" })
        }

        res.status(404).json({ error: "user not found" })

    } catch (error) {
        console.log(error, 'Error in unblock ');
        res.status(500).json({ error: "Internal server error" })
    }
}


export const specificUserSearch = async (req, res) => {
    try {
        const { search } = req.body
        console.log(search,'search');
        const searchedUserData = await pool.query(`
            SELECT * FROM users 
            WHERE email iLIKE '${search}%';
            `)
        if(!searchedUserData.rows[0]){
            return res.status(404).json({error:"user not found"})
        }
        console.log(searchedUserData.rows[0],'Searched User Data');
        res.status(200).json({userData:searchedUserData.rows})
    } catch (error) {
        console.log(error, 'Error in specific user search');
        res.status(500).json({error:"Internal server error"})
    }
}