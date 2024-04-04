const express = require('express');
const connection = require('../../../config/db');

const router = express.Router();

router.get('/', async (req, res) => {
    const { class_id, student_id } = req.query;
    let searchQuery = null;

    try {
        if (typeof class_id !== 'undefined') {
            searchQuery = `
                SELECT *
                FROM student_details_table
                WHERE Class_id_DT = ? 
                ORDER BY Student_id_DT ASC;
            `;
        } else if (typeof student_id !== 'undefined') {
            searchQuery = `
                SELECT *
                FROM student_details_table
                WHERE student_id= ?;
            `;
        }

        connection.query(searchQuery, [class_id || student_id], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).send('Internal server error');
            }
            if (results.length > 0) {
                res.json(results);
            } else {
                res.status(404).send('Not found');
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
