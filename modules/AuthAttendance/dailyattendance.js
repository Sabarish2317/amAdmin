const connection = require('../../config/db');


async function markDailyAttendance(date, studentid, periodStatusJSON, semno, day, periodno, unsuccessfulUpdatesDAmessages, successfulUpdatesDA, unsuccessfullUpdatesDA) {
    try {
        if (parseInt(periodno) === 1) {
            const insertQuery = `
            INSERT INTO Student_date_attendance_table (
              student_id_DAT, 
              Semester_No, 
              Date, 
              Day_id_DAT, 
              Period1_Status
            )
            VALUES (?, ?, ?, ?, ?)
            `;
        
            await connection.query(insertQuery, [studentid, semno, date, day, periodStatusJSON])
        .then(() => {
          successfulUpdatesDA(studentid);
        })
        .catch((err) => {
            if (err.code === 'ER_DUP_ENTRY') {
                unsuccessfulUpdatesDAmessages(`Already marked attendance for this student ${studentid} for the 1st hour`)
            }
          unsuccessfullUpdatesDA(studentid);
          console.error(err);
        });
        } else {
            let nthPeriod = `Period${periodno}_Status`;
            const updateQuery = `
                  UPDATE Student_date_attendance_table 
                  SET ${nthPeriod} = ?
                  
                  WHERE student_id_DAT = ? && Date = ?;
                `;
                await connection.query(updateQuery, [periodStatusJSON,studentid,date])
                .then(() => {
                  successfulUpdatesDA(studentid);
                })
                .catch((err) => {
                  unsuccessfullUpdatesDA(studentid);
                  console.error(err);
                }); 
        }
        
    } catch(err){
        console.error(err);
        // Handle error appropriately
    }
}


module.exports= markDailyAttendance;