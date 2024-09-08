import express from 'express';
import cors from 'cors';
import { pool } from './db/postgres.js';

const app = express();
const port = 5000;

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Define an endpoint to fetch users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    console.log(result.rows[0],'result is showing'); 
    res.json(result.rows); // Send the data as JSON
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/api/users/create',async (req,res)=>{
  const {name,email,password} = req.body
  const result = await pool.query(`INSERT INTO users (name,email,password)
    VALUES (${name},${email},${password})
    `)
    console.log(result,'result of post method');
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
