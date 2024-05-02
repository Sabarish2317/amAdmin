//scedule api
const express = require('express');
const connection = require('../../../config/db')

const router = express.Router();


router.get('/', async(req, res) => {
  try{
    // {
    // "year_id": 22,
    // "class_id": 1,
    // "day_id": 1
    // }
    const { year_id, class_id, day_id } = req.body; 
  
    //null params check case
    if(!year_id || !class_id||!day_id){
      res.status(400).send('All parameters are required');
    }
    else{
      const query = 
      `
      SELECT 
      class_column.Class_Name,
      day_column.day_name,
        schedule_table.Period_No,
       
        schedule_table.Subject_id_ST,
        
      
        subject_column.subject_name,
          subject_column.Subject_code,
        subject_column.Subject_Clip
    FROM 
        schedule_table
        
    INNER JOIN 
        class_column ON schedule_table.Class_id_ST = class_column.Class_id
    INNER JOIN 
        day_column ON schedule_table.Day_id_ST = day_column.day_id
    INNER JOIN 
        subject_column ON schedule_table.Subject_id_ST = subject_column.subject_id
    WHERE 
        schedule_table.Year_id_ST = ? AND
        schedule_table.Class_id_ST = ? AND
        schedule_table.Day_id_ST = ?
    ORDER BY 
        schedule_table.Period_No ASC;
    
      
      `;
      const results = await connection.query(query, [year_id,class_id,day_id]);
      
        
        if (results[0].length > 0) {
          res.json(results[0]);
          console.table(results[0]);
         
        } else {
          res.status(404).send('No schedule found for the given parameters');
        }
      
    }
   
  }catch(error){
      console.log('Error:', error, new Date().getTime());
      res.status(500).send('Internal server error');
    }
  });


module.exports = router;


//output
// [
//   {
//       "Class_Name": "AIML-A",
//       "day_name": "MON",
//       "Period_No": 1,
//       "Subject_id_ST": 1,
//       "subject_name": "Engineering Chemistry",
//       "Subject_code": "19CHB103",
//       "Subject_Clip": "CHEM"
//   },
//   {
//       "Class_Name": "AIML-A",
//       "day_name": "MON",
//       "Period_No": 2,
//       "Subject_id_ST": 2,
//       "subject_name": "Object Oriented Programming",
//       "Subject_code": "19CST102",
//       "Subject_Clip": "OOPS"
//   },
//   {
//       "Class_Name": "AIML-A",
//       "day_name": "MON",
//       "Period_No": 3,
//       "Subject_id_ST": 3,
//       "subject_name": "Heritage of Tamil",
//       "Subject_code": "19GET103",
//       "Subject_Clip": "HTAM"
//   },
//   {
//       "Class_Name": "AIML-A",
//       "day_name": "MON",
//       "Period_No": 4,
//       "Subject_id_ST": 4,
//       "subject_name": "Indian Constitution",
//       "Subject_code": "19HST103",
//       "Subject_Clip": "IC"
//   },
//   {
//       "Class_Name": "AIML-A",
//       "day_name": "MON",
//       "Period_No": 5,
//       "Subject_id_ST": 1,
//       "subject_name": "Engineering Chemistry",
//       "Subject_code": "19CHB103",
//       "Subject_Clip": "CHEM"
//   },
//   {
//       "Class_Name": "AIML-A",
//       "day_name": "MON",
//       "Period_No": 6,
//       "Subject_id_ST": 2,
//       "subject_name": "Object Oriented Programming",
//       "Subject_code": "19CST102",
//       "Subject_Clip": "OOPS"
//   },
//   {
//       "Class_Name": "AIML-A",
//       "day_name": "MON",
//       "Period_No": 7,
//       "Subject_id_ST": 3,
//       "subject_name": "Heritage of Tamil",
//       "Subject_code": "19GET103",
//       "Subject_Clip": "HTAM"
//   },
//   {
//       "Class_Name": "AIML-A",
//       "day_name": "MON",
//       "Period_No": 8,
//       "Subject_id_ST": 4,
//       "subject_name": "Indian Constitution",
//       "Subject_code": "19HST103",
//       "Subject_Clip": "IC"
//   }
// ]