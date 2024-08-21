const express = require('express');
const connection = require('../../../config/db');

const router = express.Router();

router.get('/', async (req, res) => {
    const { class_id, student_id } = req.query;


    try {
        if (typeof class_id !== 'undefined') {
            searchParams = class_id;
            searchQuery = `
                SELECT *
                FROM student_details_table
                WHERE Class_id_DT = ? 
                ORDER BY Student_RegNo ASC;
            `;
        }

        [results]=await connection.query(searchQuery, [searchParams]);
        
           
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


// {
//     "student_regNo" : "713522AM061"
// }

router.post('/', async (req, res) => {
    const { student_regNo } = req.body;
    console.log(req.body)

    try {
       
            searchQuery = `
            SELECT *
            FROM student_details_table
            JOIN class_column
            ON student_details_table.Class_Id_DT = class_column.Class_id
            JOIN year_column
            on student_details_table.Year_Id_DT = year_column.Year_id
            WHERE student_RegNO = ? 
            ;
            `;
        

        [results] = await connection.query(searchQuery, [student_regNo]);
        
           console.log(results)
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
