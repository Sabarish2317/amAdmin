const express = require('express');
const connection = require('../../../config/db');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM department_column';
        const [rows] = await connection.query(query);


      //   [
      //     {
      //         "Department_id": 1,
      //         "Department_Name": "AIML"
      //     },
      //     {
      //         "Department_id": 2,
      //         "Department_Name": "IT"
      //     }
      // ]

      
        if (rows.length > 0) {
            res.json(rows);
        } else {    
            res.status(404).send('No departments found');
        }
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
