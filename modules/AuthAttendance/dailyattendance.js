const connection = require('../../config/db');


async function markDailyAttendance(date, studentid, periodStatusJSON, semno, day, periodno,next) {
    try{ 
    if (parseInt(periodno) === 1){
        
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
    
        const result = await connection.query(insertQuery,[studentid,semno,date,day,periodStatusJSON] , (err) => {
         if(err){
            next(500);
            console.log(err,`Insert daily attendance error ${studentid} `)
        }
        
      });
    }
    else if(parseInt(periodno)){
        let nthPeriod = `Period${periodno}_Status`;
        const updateQuery = `
              UPDATE Student_date_attendance_table 
              SET ${nthPeriod} = ?
              
              WHERE student_id_DAT = ?;
            `;
        await connection.query(updateQuery, [periodStatusJSON,studentid], (err) => {
            if(err){
                next(500);
                console.log(err,`update daily attendance error ${studentid} `);
            }
            else{
                return next(200)
            }
        });
    }
    
    }
    
    catch(err){
        if(err){
            next(500);
            console.log(err)
        }
        

    }

}


module.exports= markDailyAttendance;