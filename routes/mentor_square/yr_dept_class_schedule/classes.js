//class List api
const express = require('express');
const connection = require('../../../config/db')

const router = express.Router();


router.get('/', async(req,res) => {
  try{
    const { year_name, dept_id} = req.query; 
    console.log([year_name,dept_id]);
    const query = `
    SELECT * 
    FROM class_column 
    WHERE Year_id_CC = ? AND Department_id_CC = ?`;
  const [rows] = await connection.query(query,[year_name,dept_id]);

      if (rows.length >= 1) {
        res.json(rows);
       
      } else {
        res.status(404).json({"message":"No data found"});
      }
    
  }catch(error){
      console.log('Error:', error)
      res.status(500).send('Internal server error');
    }
  });

  module.exports = router;