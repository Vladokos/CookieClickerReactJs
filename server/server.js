const {database} = require("./database.js");

const express = require("express");
const app = express();

app.get("/api/products", (req, res) => {
   
  let products;
  database.query("SELECT * FROM products", (error, results, fields) => {
    products = results;
  })

  res.status(200).json(products);
});

app.listen(5000, () => {
  console.log("Server is waiting");
});

// add sql
