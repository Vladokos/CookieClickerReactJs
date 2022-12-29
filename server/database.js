const mysql = require("mysql");

const database = mysql.createConnection({
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
// const close = connection.end((err) => {
//   if (err) {
//     return console.log("Error: " + err.message);
//   }
//   console.log("Success");
// });

module.exports = { database };
