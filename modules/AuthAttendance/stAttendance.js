//attendance module
const markDailyAttendance= require('./dailyattendance');
const markSubjectAttendance= require('./subjectAttendance');
const jwtValidator = require('./jwtValidator')





async function markAttendance(req, res, next) {
    const { date, day, semno, periodno, subjectid, subjectclip, auth ,staffid } = req.headers;

    const attendanceData = req.body;
    
//    [ {
//     "studentid" : 19,
//     "attstatus" : "false"
//     }
//    ]

    //
    if(!date || !day || !semno || !periodno|| !subjectid || !subjectclip|| !auth ||!staffid || !attendanceData){
        console.log([req.body,req.headers])
        res.status(401).send('All header parameters are required');
    }
   else{
    try {
        
        
       
        // Iterate over student data in the body
        await attendanceData.forEach(async studentData => {
            // Assign data for each student
            const { studentid, attstatus } = studentData;
            // console.log(studentData)
            // console.log(studentid);
            // console.log(attstatus);
            const periodStatusJSON = JSON.stringify({ [subjectclip]: attstatus });

           

            // Main functional logic for authentication

            if (jwtValidator(auth)) {
                
                await markDailyAttendance(date, studentid, periodStatusJSON, semno, day, periodno,next);
                await markSubjectAttendance(studentid, subjectid,attstatus,semno,next);
                //
                
                
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
   
   }
    
}





module.exports = markAttendance;
