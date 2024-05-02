//year List api
const express = require('express');
const connection = require('../../../config/db')

const router = express.Router();

router.get('/', async(req , res) => {

  try{  
    const query = 'SELECT * FROM year_column ';
    const [results] = await connection.query(query);
      
      if (results.length > 0) {
        res.json(results);
        // console.table(results);
      //   [
      //     {
      //         "Year.id": 23,
      //         "Year_Name": 1
      //     },
      //     {
      //         "Year.id": 22,
      //         "Year_Name": 2
      //     },
      //     {
      //         "Year.id": 21,
      //         "Year_Name": 3
      //     },
      //     {
      //         "Year.id": 20,
      //         "Year_Name": 4
      //     }
      // ]
       
      } else {
        res.status(404).send('No data found');
      }
    }
    catch(error){
      console.log('Error:', error);
      res.status(500).send('Internal server error');
    }
  });

  
module.exports = router;
