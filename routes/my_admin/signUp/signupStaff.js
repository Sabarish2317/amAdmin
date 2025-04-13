const express = require('express');
const connection = require('../../../config/db');
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post('/', async (req, res) => {
    //{"mail_id" : "Sabarish_7@gmail.com", "password" : "Sabarish_7","staff_Name" : "Sabarish" ,"staff_RegNO": "713522AM081"}
    const {mail_id, password,staff_Name,staff_RegNO} = req.body;
    try {
        //null params test case
          if (!mail_id || !password || !staff_Name || !staff_RegNO ) {

      return res.status(400).send('All parameters Are required');
    }
    else{
        //hashing        
        const hash = await bcrypt.hash(password, 12);

        // Insert hashed password into Staff_login_table
        const insertQuery = `
            INSERT INTO Staff_login_table(mail_id, password_hash)
            VALUES(?, ?)
        `;
         // Saving result to get the staff id after inserting
        const loginResult = await connection.query(insertQuery, [mail_id, hash]);
        if (loginResult && loginResult[0].insertId) {
            // Retrieve the auto-generated staff_id
            staff_id = loginResult[0].insertId;

             // if inserted successfully then using the returned staff_id to enter staff details into staff_detail_table
            const staffInsertQuery = `
                INSERT INTO Staff_details_table(
                    Staff_id_DT,
                    staff_Name,
                    staff_RegNO
                )
                VALUES(?,?,?)
            `;
            await connection.query(staffInsertQuery, [staff_id,staff_Name,staff_RegNO]);
            // Send a success response
            res.status(200).send('User registered successfully');
            
        } else {
            return res.status(500).send('Failed to Registerr');
        }
}
        // Hash the password
    }catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        console.log('Error:', error, );
          res.status(400).send('This account already exists.');
      }   // data length mismatch error 
      else if(error.code=== 'ER_DATA_TOO_LONG'){
        console.log('Error:', error, );

        res.status(403).send('invalid long input')
      }
      else if(req.body===null){
        console.log('Error:', error, new Date().getTime());

        res.send("enter all details")
      }
      else {
          // Other errors
          console.log('Error:', error, new Date().getTime());

          res.status(500).send('Internal server error');
      }
  }
});

module.exports = router;
