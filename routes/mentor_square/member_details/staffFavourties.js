const express = require('express');
const connection = require('../../../config/db');

const router = express.Router();

router.post('/', async (req, res) => {
    console.log('noak')
    const { favourites, staff_id } = req.body;
    console.log(req.body)
    
    try {
        const query = `
            UPDATE staff_details_table 
            SET Staff_Favs = ?
            WHERE staff_id_dt = ?;
        `;
        
        const [results] = await connection.query(query, [JSON.stringify(favourites), staff_id]);
        
        if (results.affectedRows > 0) {
            res.status(200).send("Change made successfully");
            console.log("updated staff favss")
        } else {
            res.status(401).send("Error occurred");
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;


router.get('/', async (req, res) => {
    // Extracting register numbers from the query string
    const { student_regNos } = req.query;

    // Splitting the query parameter to get an array of register numbers
    const registerNumbers = student_regNos.split(',');

    // Logging the received register numbers
    console.log(registerNumbers);

    try {
        // Dynamically creating placeholders for the SQL query
        const placeholders = registerNumbers.map(() => '?').join(',');

        // Constructing the SQL query with multiple register numbers
        const searchQuery = `
            SELECT *
            FROM student_details_table
            JOIN class_column
            ON student_details_table.Class_Id_DT = class_column.Class_id
            JOIN year_column
            ON student_details_table.Year_Id_DT = year_column.Year_id
            WHERE student_RegNO IN (${placeholders});
        `;

        // Executing the query with the provided register numbers
        const [results] = await connection.query(searchQuery, registerNumbers);

        // Logging the results
        console.log(results);

        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).send('Not found');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});
