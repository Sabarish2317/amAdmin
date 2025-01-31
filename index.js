const express = require("express");
const cors = require("cors");

//routes for staffApp
const staffRoute = require("./routes/mentor_square/member_details/staffDetails");
const studentRoute = require("./routes/mentor_square/member_details/studentDetails");
const classRoute = require("./routes/mentor_square/yr_dept_class_schedule/classes");
const departmentRoute = require("./routes/mentor_square/yr_dept_class_schedule/departments");
const scheduleRoute = require("./routes/mentor_square/yr_dept_class_schedule/schedule");
const yearRoute = require("./routes/mentor_square/yr_dept_class_schedule/years");
const attendanceRoute = require("./routes/attendance");
const staffLoginRoute = require("./routes/mentor_square/staffLogin");
const studentLoginRoute = require("./routes/mentor_square/studentLogin");
const staffSignUpRoute = require("./routes/my_admin/signUp/signupStaff");
const studentSignUpRoute = require("./routes/my_admin/signUp/signupStudent");
const studentsSubjectAttendanceRoute = require("./routes/attentive_aid/student_subject_attendance_detail");
const staffFavouritesRoute = require("./routes/mentor_square/member_details/staffFavourties");
const studentDateAttendanceRoute = require("./routes/attentive_aid/student_daily_attendance_detail");

//middlewares
const app = express();
app.use(cors());
app.use(express.json());

//global error handling
app.use((err, req, res, next) => {
  // logger
  console.error(err.stack);

  // Default error message
  let message = "Internal Server Error";
  let status = 500;

  // specss chek
  if (err.status === 404) {
    message = "Resource Not Found";
    status = 404;
  } else if (err.status === 403) {
    message = "Forbidden";
    status = 403;
  }

  // error manager
  res.status(status).json({
    error: {
      message: err.message || message,
    },
  });
});

//middle ware to change the years and semesters
// Middleware function to modify `semno` header based on a condition
const modifyHeadersMiddleware = (req, res, next) => {
  let semno = req.headers["semno"];

  if (semno === "20") {
    req.headers["semno"] = "7";
  } else if (semno === "21") {
    req.headers["semno"] = "5";
  } else if (semno === "22") {
    req.headers["semno"] = "3";
  } else if (semno === "23") {
    req.headers["semno"] = "1";
  }

  next();
};

// Apply the middleware to all routes
app.use(modifyHeadersMiddleware);

//staff api auth
app.use("/my-admin/api/signup/staff", staffSignUpRoute); //http://localhost:3000/my-admin/api/signup/staff
app.use("/MentorSquare/api/signin/staff", staffLoginRoute); //http://localhost:3000/MentorSquare/api/signin/staff
//
//staff api routes
app.use("/MentorSquare/api/staffs", staffRoute); //http://localhost:3000/MentorSquare/api/staffs?staff_id=1
app.use("/MentorSquare/api/years", yearRoute); //http://localhost:3000/MentorSquare/api/years
app.use("/MentorSquare/api/departments", departmentRoute); //http://localhost:3000/MentorSquare/api/departments
app.use("/MentorSquare/api/schedule", scheduleRoute); //http://localhost:3000/MentorSquare/api/schedule
//tokenized
app.use("/MentorSquare/api/mark_attendance", attendanceRoute); //http://localhost:3000/MentorSquare/api/mark_attendance
//
app.use("/MentorSquare/api/students", studentRoute); //http://localhost:3000/MentorSquare/api/students?class_id=1
app.use("/MentorSquare/api/classes", classRoute); //http://localhost:3000/MentorSquare/api/classes?year_name=22&dept_id=1
app.use("/my-admin/api/signup/student", studentSignUpRoute); //http://localhost:3000/my-admin/api/signup/student
app.use("/MentorSquare/api/staff/favourites", staffFavouritesRoute);

//login route for attentiveAid api
app.use("/attentiveAid/api/signin/student", studentLoginRoute); //http://localhost:3000/attentiveAid/api/signin/student
//student app retrive api
app.use(
  "/attentiveAid/api/students/Attendance/subjects",
  studentsSubjectAttendanceRoute
); //http://localhost:3000/attentiveAid/api/api/students/Attendance/subjects

app.use(
  "/attentiveAid/api/students/Attendance/daily",
  studentDateAttendanceRoute
);

//

app.post("/login-test", (req, res) => {
  const { userName, password } = req.body;
  res.json({ message: "hello", status_code: 200 });
});

//port listening
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// process.env.PORT
