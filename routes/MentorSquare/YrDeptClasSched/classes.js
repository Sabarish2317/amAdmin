//class List api
const express = require('express');
const connection = require('../../../config/db')

const router = express.Router();


router.get('/', async(req,res) => {
  try{
    const { year_name, dept_id} = req.query; 
    const query = `
    SELECT * 
    FROM class_column 
    WHERE Year_id_CC = ? AND Department_id_CC = ?`;
    await connection.query(query,[year_name,dept_id], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal server error');
      }
      if (results.length > 0) {
        res.json(results);
       
      } else {
        res.status(404);
      }
    });
  }catch(error){
      console.log('Error:', error,Date().currentDate.getTime());
      res.status(500).send('Internal server error');
    }
  });

  module.exports = router;