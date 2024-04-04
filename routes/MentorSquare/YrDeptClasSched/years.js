//year List api
const express = require('express');
const connection = require('../../../config/db')

const router = express.Router();

router.get('/', async(req , res) => {

  try{  
    const query = 'SELECT * FROM year_column ';
    await connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal server error');
      }
      if (results.length > 0) {
        res.json(results);
       
      } else {
        res.status(404);
      }
    });}
    catch(error){
      console.log('Error:', error,Date().currentDate.getTime());
      res.status(500).send('Internal server error');
    }
  });

  
module.exports = router;
