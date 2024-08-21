const connection = require('../../config/db');

async function markSubjectAttendance(studentid, subjectid, attstatus, semno, next, successfulUpdatesSA, unsuccessfullUpdatesSA) {
    try {
        let presentClassCount = 0;
        let totalClassCount = 1;

        if (attstatus == "True" || attstatus == 'true' || attstatus == true) {
            presentClassCount = 1;
        }

        const retrieveQuery = `
            SELECT *
            FROM student_period_attendance_table
            WHERE student_id_PAT = ? AND subject_id_PAT = ?
        `;

        const [results] = await connection.query(retrieveQuery, [studentid, subjectid]);
     
        if (results.length === 0) {
            const InsertQuery = `
                INSERT INTO Student_period_attendance_table (
                    student_id_PAT,
                    sem_no,
                    subject_id_PAT,
                    present_class_count,
                    total_class_count 
                ) VALUES (?,?, ?, ?, ?)
            `;

            const insertResult = await connection.query(InsertQuery, [studentid,semno, subjectid, presentClassCount, totalClassCount]).then(() => {
                successfulUpdatesSA(studentid);
              })
              .catch((err) => {
                unsuccessfullUpdatesSA(studentid);
                console.error(err);
              });
        } else {
            const existingPresentClassCount = results[0].Present_Class_Count || 0;
            const existingTotalClassCount = results[0].Total_Class_Count || 0;

            presentClassCount += existingPresentClassCount;
            totalClassCount += existingTotalClassCount;

            const updateQuery = `
                UPDATE Student_period_attendance_table
                SET present_class_count = ?,
                    total_class_count = ?
                WHERE student_id_PAT = ? AND subject_id_PAT = ?
            `;

            const insertResult = await connection.query(updateQuery, [presentClassCount, totalClassCount, studentid, subjectid]).then(() => {
                successfulUpdatesSA(studentid);
              })
              .catch((err) => {
                unsuccessfullUpdatesSA(studentid);
                console.error(err);
              }
            );
        }
       
    } catch (error) {
        console.error(error);
        next(error); // Pass the error to the error handling middleware
    }
}

module.exports = markSubjectAttendance;
