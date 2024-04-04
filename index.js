const express = require('express');


//routes for staffApp
const staffRoute = require('./routes/MentorSquare/member_details/StaffDetails');
const studentRoute = require('./routes/MentorSquare/Member_Details/studentDetails');
const classRoute = require('./routes/MentorSquare/YrDeptClasSched/classes');
const departmentRoute = require('./routes/MentorSquare/YrDeptClasSched/departments');
const scheduleRoute = require('./routes/MentorSquare/YrDeptClasSched/schedule');
const yearRoute = require('./routes/MentorSquare/YrDeptClasSched/years');
const attendanceRoute = require('./routes/attendance');
const staffLoginRoute = require('./routes/MentorSquare/staffLogin');
const studentLoginRoute = require('./routes/MentorSquare/studentLogin');
const staffSignUpRoute = require('./routes/MyAdmin/signUp/signupStaff');
const studentSignUpRoute = require('./routes/MyAdmin/signUp/signupStudent');

//middlewares
const app = express();
app.use(express.json());


//global error handling
app.use((err, req, res, next) => {
  // Log the error for debugging
  console.error(err.stack);

  // Default error message and status code
  let message = 'Internal Server Error';
  let status = 500;

  // Check if the error has a specific message or status code
  if (err.status === 404) {
    message = 'Resource Not Found';
    status = 404;
  } else if (err.status === 403) {
    message = 'Forbidden';
    status = 403;
  }

  // Set the response status code and error message
  res.status(status).json({
    error: {
      message: err.message || message
    }
  });
  
});



//login route for mentorSquare api
app.use('/MentorSquare/api/staffs',staffRoute)//http://localhost:3000/MentorSquare/api/staffs?staff_id=1
app.use('/MentorSquare/api/students',studentRoute)//http://localhost:3000/MentorSquare/api/students?class_id=1
app.use('/MentorSquare/api/classes',classRoute)//http://localhost:3000/MentorSquare/api/classes?year_name=22&dept_id=1
app.use('/MentorSquare/api/departments',departmentRoute)//http://localhost:3000/MentorSquare/api/departments
app.use('/MentorSquare/api/schedule',scheduleRoute)
app.use('/MentorSquare/api/years',yearRoute)
app.use('/MentorSquare/api/mark_attendance',attendanceRoute)//http://localhost:3000/MentorSquare/api/mark_attendance
app.use('/MentorSquare/api/signin/staff',staffLoginRoute)//http://localhost:3000/MentorSquare/api/signin/staff

//login route for admin panel api
app.use('/my-admin/api/signup/staff',staffSignUpRoute)//http://localhost:3000/my-admin/api/signup/staff
app.use('/my-admin/api/signup/student',studentSignUpRoute)//http://localhost:3000/my-admin/api/signup/student

//login route for attentiveAid api
app.use('/attentiveAid/api/signin/student',studentLoginRoute)//http://localhost:3000/attentiveAid/api/signin/student






//port listening
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




