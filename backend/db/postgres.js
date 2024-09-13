import pg from "pg";
const { Pool } = pg
export const pool = new Pool({
    user: 'luffy',
    host: 'localhost',
    database: 'mydb',
    password: 'ichigo',
    port: 5432,
});


const createTable = async () => {
    const client = await pool.connect()
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS users (
            userid SERIAL PRIMARY KEY,
            name VARCHAR(40) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            imageurl VARCHAR(120) 
        );`)

    } catch (err) {
        console.error('Error creating table:', err);
    } finally {
        client.release();
    }
};

// Execute the function
createTable().catch((err) => console.error('Unexpected error:', err));