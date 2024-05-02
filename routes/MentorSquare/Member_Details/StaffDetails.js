//staff detail api
const express = require('express');
const connection = require('../../../config/db')

const router = express.Router();



router.get('/', async(req, res) => {
  try{
    const {staff_id} = req.query;
    //
    if (!staff_id) {
      return res.status(400).send('Staff_id is required');
    }
    const query = 'SELECT * FROM staff_details_table WHERE Staff_id_DT = ? ';
    const results = await connection.query(query,[staff_id]);
    
      if (results.length > 0 && results[0].length > 0) {
        res.json(results[0][0]);
        //list result
  //       
  //   {
  //     Staff_id_DT: 9,  
  //     Staff_Name: 'Rithika Shenoy R',
  //     Staff_RegNo: '713522AM082'
  //   }
  // 
  // console.log(results[0])
       
       
      }else{
        res.status(404).send('No staffs where found for the given id')
      }
    
  }catch(error){
    console.log('Error:', error);
    res.status(500).send('Internal server error');
  }
  });

module.exports = router;