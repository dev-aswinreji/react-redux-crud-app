import { pool } from "../db/postgres.js"

export const imageUpload = async (req, res) => {
    try {

        console.log(req.body, 'file is here');
        const { fileName } = req.body
        const userid = req.user?.userid
        const output = await pool.query(`UPDATE users SET imageurl=$1 WHERE userid=$2`,
            [fileName, userid]
        )
        res.status(201).json({ message: "Image uploaded success" ,fileUrl:output.rows[0]?.imageurl})
    } catch (error) {
        console.log(error, 'Error is showing while image Upload');
        res.status(500).json({ error: "Internal server error" })
    }

}