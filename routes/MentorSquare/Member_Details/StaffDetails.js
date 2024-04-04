//staff detail api
const express = require('express');
const connection = require('../../../config/db')

const router = express.Router();



router.get('/', async(req, res) => {
  try{
    const {Staff_id} = req.query;
    
    const query = 'SELECT * FROM staff_details_table WHERE staff_id_DT = 1';
    await connection.query(query, [Staff_id], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal server error');
      }
      if (results.length > 0) {
        res.json(results[0]);
       
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