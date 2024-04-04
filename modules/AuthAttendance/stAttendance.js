//attendance module
const markDailyAttendance= require('./dailyattendance');
const markSubjectAttendance= require('./subjectAttendance');
const jwtValidator = require('./jwtValidator')





async function markAttendance(req, res, next) {
    try {
        const { date, day, semno, periodno, subjectid, subjectclip, auth ,staffid} = req.headers;
        const attendanceData = req.body;

        // Iterate over student data in the body
        await attendanceData.forEach(async studentData => {
            // Assign data for each student
            const { studentid, attstatus } = studentData;
            const periodStatusJSON = JSON.stringify({ [subjectclip]: attstatus });

           

            // Main functional logic

            if (jwtValidator(auth)) {
                
                await markDailyAttendance(date, studentid, periodStatusJSON, semno, day, periodno,next);
                await markSubjectAttendance(studentid, subjectid,attstatus,semno,next);
                
            } else {
                res.status(401).send('Unauthorized request');
                console.log(`unauthorized request by ${staffid}`)            
            }
            
        }

        );
        
        
    } catch (error) {
        console.error('Error:', error);
        next(500,"Server query error");
        
    }
    res.status(200).send("Successfully updated attendance")
}





module.exports = markAttendance;
