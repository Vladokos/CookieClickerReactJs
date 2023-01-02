const { database } = require("./database.js");

const express = require("express");
const app = express();

app.get("/api/products", (req, res) => {
  database.query("SELECT * FROM products", (error, results, fields) => {
    return res.status(200).json(results);
  });
});

app.post("/api/getData", (req, res) => {
  const { id } = req.body;

  database.query(
    `SELECT amountCookies,amountHelpers FROM users WHERE id = '${id}'`,
    (error, results, fields) => {
      return res.status(200).json(results);
    }
  );
});

app.post("/api/writeData", (req, res) => {
  console.log(req.body);//fix 'cause get undefined
  const { id, currency, helpers } = req.body;
  database.query(
    `SELECT * FROM users WHERE id = '${id}'`,
    (error, results, fields) => {
      if (results.length > 0) {
        database.query(`UPDATE users SET amountCookies = '${currency}', 
      amountHelpers = '${helpers}' WHERE id = '${id}'`);
      } else {
        database.query(
          `INSERT INTO users VALUES('${id}','${currency}','${helpers}')`
        );
        database.query(`UPDATE users SET amountCookies = '${currency}', 
      amountHelpers = '${helpers}' WHERE id = '${id}'`);
      }
    }
  );

 return res.status(200);
});

app.listen(5000, () => {
  console.log("Server is waiting");
});
