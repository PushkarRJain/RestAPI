const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
require("dotenv").config();

// parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

//GET Request
//show all products
app.get("/api/products", (req, res) => {
  let sql = "SELECT * FROM product";
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//GET Request
//show single product
app.get("/api/products/:id", (req, res) => {
  let sql = "SELECT * FROM product WHERE product_id=" + req.params.id;
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//POST Request
app.post("/api/products", (req, res) => {
  let data = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
  };
  let sql = "INSERT INTO product SET ?";
  conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//PUT Request
app.put("/api/products/:id", (req, res) => {
  let sql =
    "UPDATE product SET product_name='" +
    req.body.product_name +
    "', product_price='" +
    req.body.product_price +
    "' WHERE product_id=" +
    req.params.id;
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//DELETE Request
app.delete("/api/products/:id", (req, res) => {
  let sql = "DELETE FROM product WHERE product_id=" + req.params.id + "";
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//Server listening
app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});
