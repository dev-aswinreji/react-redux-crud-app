import { pool } from "../db/postgres.js"

export const adminHome = async (req, res) => {
    try {
        const { id } = req.user
        const adminData = await pool.query(`
            SELECT name,email,userid from users WHERE userid='${id}';
            `)
        res.status(200).json({ adminData: adminData.rows[0], message: "Authorization approved" })

    } catch (error) {
        console.log(error, 'Error in admin home');
    }
}

export const usersList = async (req, res) => {
    try {

        const usersList = await pool.query(`
        SELECT * FROM users WHERE isadmin = false;
        `)

        res.status(200).json({ userslist: usersList.rows })

    } catch (error) {

        console.log(error, 'Error in users list');
        res.status(500).json({ error: "Internal server error" })
    }
}


export const block = async (req, res) => {

    try {

        const { email } = req.body

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
        console.log(search, 'data is recienving');
        const searchedUserData = await pool.query(`
            SELECT * FROM users 
            WHERE email iLIKE '${search}%';
            `)

        if (!searchedUserData.rows[0]) {
            return res.status(404).json({ error: "user not found" })
        }

        res.status(200).json({ userslist: searchedUserData.rows })
    } catch (error) {
        console.log(error, 'Error in specific user search');
        res.status(500).json({ error: "Internal server error" })
    }
}