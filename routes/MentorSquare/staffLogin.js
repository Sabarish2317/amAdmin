const express = require('express');
const connection = require('../../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();
const key = process.env.ACCESS_KEY;

const router = express.Router();
const app = express();
app.use(express.json());


router.post('/', async (req, res) => {
  try {
    //{"mail_id" : "Sabarish_7@gmail.com", "password" : "Sabarish_7"}
    const { mail_id, password } = req.body
    console.log(mail_id,password);
    //test cases
    if (mail_id.length<0) {
      return res.status(400).send('Mail id is required');
    }
    else if(!password.length<0){
      return res.status(400).send('Password is required')
    }
    //approved request (not bad)
    else{
      const query = `
      SELECT *
      FROM staff_login_table 
      WHERE mail_id = ?`;
    const [rows] = await connection.query(query, [mail_id]);
    if (rows.length ===0) {
      return res.status(404).send('No user found with this email');
    }
    
    const hashedPasswordFromDatabase = rows[0].Password_Hash;
    const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDatabase);

    if (passwordMatch) {
      //login auth
      let mail_id = rows[0].mail_id;
      let staff_id = rows[0].Staff_id;
      const accessToken = jwt.sign({ "mail_id": mail_id }, key);
      res.status(200).json({ status : "Success","staff_id": staff_id, "token": accessToken});
      console
//       {
//     "status": "Success",
//     "staff_id": 10,
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTQ1MDY5NTN9.ZBsVhN4g-yJxv42bLLInlgCHoirWIMH1I-B-pyTlKiE"
// }




    } else {
      res.status(401).json({ status : "Failed" , message: "Incorrect Password"});
    }
    }
    
  } catch (error) {
    console.log('Error:',error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;



