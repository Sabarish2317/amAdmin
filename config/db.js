const mysql = require('mysql2/promise');

const dotenv = require('dotenv')
dotenv.config();



const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
 
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0

  
});

connection.getConnection()
  .then(connection => {
    console.log('Database connected successfully!');
    connection.release();
  })
  .catch(error => {
    console.error('Error connecting to database:', error);
  });


// db check




module.exports = connection;




