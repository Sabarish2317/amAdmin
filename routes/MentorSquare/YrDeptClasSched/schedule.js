//scedule api
const express = require('express');
const connection = require('../../../config/db')

const router = express.Router();


router.get('/', async(req, res) => {
  try{
    const { year_id, class_id, day_id } = req.query; 
    const query = 
    `
    SELECT *
    FROM schedule_table 
    LEFT JOIN subject_column ON schedule_table.subject_id_ST = subject_column.subject_id
    WHERE Year_id_ST = 22 AND
          Class_id_ST = 1 AND
          Day_id_ST = 1
    ORDER BY Period_No ASC;
    
    `;
    connection.query(query, [year_id,class_id,day_id], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal server error');
      }
      if (results.length > 0) {
        res.json(results);
       
      } else {
        res.status('Not found');
      }
    });
  }catch(error){
      console.log('Error:', error,Date().currentDate.getTime());
      res.status(500).send('Internal server error');
    }
  });


module.exports = router;