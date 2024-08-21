const express = require('express');
const connection = require('../../config/db');

const router = express.Router();

router.post('/', async (req, res) => {
    const { sem_no , student_id } = req.body;
    console.log("subject attend",req.body);


    try {
     
         
            searchQuery = `
            SELECT *
FROM student_period_attendance_table spat
JOIN subject_column st ON spat.Subject_id_PAT = st.subject_id
WHERE spat.student_id_PAT = ? AND spat.sem_no = ?;
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
