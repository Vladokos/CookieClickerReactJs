const express = require("express");
const app = express();

app.get("/api/products", (req, res) => {
  const ip = req.ip;
  console.log(ip);
  const products = [
    { id: 1, name: "1help", cost: "1" },
    { id: 2, name: "2help", cost: "2" },
    { id: 3, name: "3help", cost: "3" },
  ];
  res.json(products);
});

app.listen(5000, () => {
  console.log("Server is waiting");
});
