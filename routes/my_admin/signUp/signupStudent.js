const express = require("express");
const connection = require("../../../config/db");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    mail_id,
    password,
    student_RegNO,
    Student_Name,
    Class_id,
    dept_id,
    year_id,
  } = req.body;
  let student_id = null;
  try {
    // Hash the password
    const hash = await bcrypt.hash(password, 12);
    console.log("Hashed password:", hash);

    // Insert hashed password into Student_login_table
    const insertQuery = `
            INSERT INTO Student_login_table(mail_id, password_hash)
            VALUES(?, ?)
        `;
    const loginResult = await connection.query(insertQuery, [mail_id, hash]);
    if (loginResult && loginResult[0].insertId) {
      // Retrieve the auto-generated student_id
      student_id = loginResult[0].insertId;

      // Insert other data into Student_details_table
      const studentInsertQuery = `
                INSERT INTO Student_details_table(
                    Student_id_DT,
                    student_RegNO,
                    Student_Name,
                    Class_ID_DT,
                    Department_Id_DT,
                    Year_Id_DT
                )
                VALUES(?,?,?,?,?,?)
            `;
      await connection.query(studentInsertQuery, [
        student_id,
        student_RegNO,
        Student_Name,
        Class_id,
        dept_id,
        year_id,
      ]);

      // Send a success response
      res.status(200).send("User registered successfully");
    } else {
      // If loginResult.insertId is not available, handle the error
      throw new Error(
        "Failed to get student_id after inserting into Student_login_table"
      );
    }
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      // Duplicate entry error
      res.status(400).send("This account already exists.");
    } else if (error.code === "ER_DATA_TOO_LONG") {
      res.status(403).send("invalid long input");
    } else {
      // Other errors
      console.error("Error:", error);
      res.status(500).send("Internal server error");
    }
  }
});

module.exports = router;
