const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "cookieclicker",
});

// const open = connection.connect((err) => {
//   if (err) {
//     return console.log("Error: " + err.message);
//   }
//   console.log("Success");
// });

// const close = connection.close((err) => {
//   if (err) {
//     return console.log("Error: " + err.message);
//   }
//   console.log("Success");
// });

module.exports = { connection };
