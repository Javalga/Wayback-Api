const mysql = require("mysql2");

const connection = mysql.createConnection({
  host:
    process.env.DB_HOST ||
    "wayback-database.cyavsibz6fni.us-east-1.rds.amazonaws.com",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "EjpHf7yEAR7BsJ08xoEY",
  database: process.env.DB_NAME || "",
  port: process.env.DB_PORT || 3306,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Conection succeed.');
  }
})

module.exports = connection;