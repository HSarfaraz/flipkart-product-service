const express = require("express");
const https = require("https");
const fs = require("fs");
const mysql = require("mysql");
const { verifyAPIKey } = require("./middleware");

const app = express();
const port = 4000;

// Creating HTTPS Server
const privateKey = fs.readFileSync("ssl/private-key.pem", "utf8");
const certificate = fs.readFileSync("ssl/certificate.pem", "utf8");
const ca = fs.readFileSync("ssl/csr.pem", "utf8");

const credentials = { key: privateKey, cert: certificate, ca: ca };

var databaseOptions = require("dotenv").config();
var db = mysql.createConnection(databaseOptions);

app.use(express.json());

app.get("/", verifyAPIKey, (req, res) => {
  res.send("Flipkart product service");
});

app.get("/products", verifyAPIKey, (req, res) => {
  let sql = "select * from flipkartproductdb.product";
  db.query(sql, (error, data) => {
    if (error) return res.status(500).send(error);
    res.status(200).send(data);
  });
});

app.put("/products", verifyAPIKey, (req, res) => {
  const id = req.params.id;
  console.log(id);

  const product = req.body;

  let sql = "UPDATE flipkartproductdb.product SET ? WHERE id = ?";
  db.query(sql, [product, id], (error, data) => {
    if (error) return res.status(500).send(error);
    res.status(201).send(product);
  });
});

app.post("/products", verifyAPIKey, (req, res) => {
  const product = req.body;
  let sql = "INSERT INTO flipkartproductdb.product SET ?";
  db.query(sql, product, (error, data) => {
    if (error) return res.status(500).send(error);
    res.status(201).send(product);
  });
});

app.delete("/products/:id", verifyAPIKey, (req, res) => {
  const id = req.params.id;
  console.log(id);

  let sql = "DELETE FROM flipkartproductdb.product WHERE id = ?";
  db.query(sql, id, (error, data) => {
    if (error) return res.status(500).send(error);
    res.status(200).send(`product od ${id} is deleted`);
  });
});

const server = https.createServer(credentials, app);
server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
