const express = require('express');
const connection = require('../../config/db');
const bcrypt = require('bcrypt');
const router = express.Router();

//middlewares
const app = express();
app.use(express.json());

router.post('/', async (req, res, next) => {
  try {
    const { mail_id, password } = req.body;
    const query = `
      SELECT *
      FROM student_login_table 
      WHERE mail_id = ?`;
    const [rows] = await connection.query(query, [mail_id]);

    if (rows.length === 0) {
      return res.status(404).send('No user found with this email');
    }
    
    const hashedPasswordFromDatabase = rows[0].Password_Hash;
    const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDatabase);

    if (passwordMatch) {
      res.status(200).json({ student_id: rows[0].Student_id });
    } else {
      res.status(401).send('Password does not match');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
