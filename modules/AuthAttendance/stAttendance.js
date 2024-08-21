//attendance module
const markDailyAttendance= require('./dailyattendance');
const markSubjectAttendance= require('./subjectAttendance');
const jwtValidator = require('./jwtValidator');
const { json } = require('express');





async function markAttendance(req, res, next) {
    console.log('attendance reequested  ')
    console.log(req.body)
    
    const { date, day, semno, periodno, subjectid, subjectclip, auth ,staffid } = req.headers;
    console.log(req.headers)

    const attendanceData = req.body;
    console.log('semno:',semno)
   

    if(!date || !day || !semno || !periodno|| !subjectid || !subjectclip|| !auth ||!staffid || !attendanceData){      
        return res.status(401).send('All header parameters are required');
    }
    //getting sem number but in reality it is year id we do post processig to convert it into sem no


    try {
        

  
        //variable to store the data friom the call back functions
        var successfulUpdatesDAV = [];
        var successfulUpdatesSAV = [];
        var unsuccessfullUpdatesDAV = [];
        var unsuccessfullUpdatesSAV = [];
        //
        var unsuccessfullUpdatesDAmessagesV = [];
        //
        if(jwtValidator(auth)){
            //these funcitons are passsed to the other funcitons and are called back if there is an error in the passed funcito and it updates the cvlaues
            function successfulUpdatesDailyAttendance(studentId){
                
                successfulUpdatesDAV.push(studentId);
            }
            function successfulUpdatesSubjectAttendance(studentId){
                successfulUpdatesSAV.push(studentId);
            }
            function unsuccessfullUpdatesDailyAttendance(studentId){
                unsuccessfullUpdatesDAV.push(studentId);
            }
            function unsuccessfullUpdatesSubjectAttendance(studentId){
                unsuccessfullUpdatesSAV.push(studentId);
            }
            //error message handler
            function unsuccessfulUpdatesDAmessages(messages){
                unsuccessfullUpdatesDAmessagesV.push(messages);
            }
           

            await Promise.all(attendanceData.map(async studentData => {
                const { studentid, attstatus } = studentData;
                const periodStatusJSON = JSON.stringify({ [subjectclip]: attstatus });

                await markDailyAttendance(date, studentid, periodStatusJSON, semno, day, periodno, unsuccessfulUpdatesDAmessages, 
                    //passing the call back funcitons
                    successfulUpdatesDailyAttendance,
                    unsuccessfullUpdatesDailyAttendance
                );
                await markSubjectAttendance(studentid, subjectid, attstatus, semno, next,
                    //passing the call back funcitons
                    successfulUpdatesSubjectAttendance,
                    unsuccessfullUpdatesSubjectAttendance
                );
            }));

            const message = {
                updatedDailyAttendanceFor: successfulUpdatesDAV,
                notUpdatedDailyAttendanceFor: unsuccessfullUpdatesDAV,
                updatedSubjectAttendanceFor: successfulUpdatesSAV,
                notUpdatedSubjectAttendanceFor: unsuccessfullUpdatesSAV,
                errorMessages: unsuccessfullUpdatesDAmessagesV
            };
             
            res.status(200).json(message);
       
        } else {
            res.status(401).send("Unauthorized request, this will be reported");
            console.log('Unauthorized request to update attendance by staff id:', staffid);
        }       
    } catch (error) {
       res.status(500).send("Internal Server error, try again later");
    }
}






module.exports = markAttendance;
