import express from 'express';
import cors from 'cors';
import { pool } from './db/postgres.js';

const app = express();
const port = 5000;

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Define an endpoint to fetch users
// app.get('/api/users', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM users');
//     console.log(result.rows[0], 'result is showing');
//     res.json(result.rows); // Send the data as JSON
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// app.post('/api/users', async (req, res) => {
//   try {

//     const { name, email, password } = req.body
//     console.log(name, email, password, 'jej', typeof name);
//     if(!name || !email || !password){
//       return res.status(400).json({result:"provided information is not correct"})
//     }
//     const result = await pool.query(
//       'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
//       [name, email, password]
//     );
//     console.log(result, 'result of post method');
//     res.status(200).json({result:"account created successfully"})
//   } catch (error) {
//     res.status(500).json({error,result:"Internal Server Error"})
//     console.log(error, 'Error in post method');
//   }
// })

app.post('/api/users/login', async (req, res) => {
  try {

    const { email } = req.body
    console.log(email, 'sowing pass and email');
    const result = await pool.query(
      `SELECT * FROM users WHERE email=$1`,
      [email]
    )
    console.log(result.rows,'resul is hererrrrr');
    if (result.rows)
      res.json(result.rows[0].password)

  } catch (error) {
    res.json(error)
    console.log(error, 'Login api ');
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
