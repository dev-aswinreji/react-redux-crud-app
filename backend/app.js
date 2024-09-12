import express from 'express';
import cors from 'cors';
import { pool } from './db/postgres.js';
import route from './route/user.js';
import jwt from 'jsonwebtoken';

const app = express();
const port = process.env.PORT;
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }))

app.use('/', route)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
