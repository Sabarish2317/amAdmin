const express = require('express');
const connection = require('../../config/db');

const router = express.Router();

router.post('/', async (req, res) => {
    const { sem_no , student_id } = req.body;
    console.log("subject attend",req.body);


    try {
     
         
            searchQuery = `
            SELECT * FROM attendanceapp_db_v0_2.student_date_attendance_table
            WHERE Student_id_DAT = ? && Semester_No = ?;
            `;
       

        [results]=await connection.query(searchQuery, [student_id,sem_no]);
        
           
            if (results.length > 0) {
                res.json(results).status(200);
            } else {
                res.status(404).send('Not found');
            }
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;













module.exports = router;
