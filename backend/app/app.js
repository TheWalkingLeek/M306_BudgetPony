import { serializeSqlResult, serializeSqlResults } from "./serializer.js";

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const { Pool } = require("pg");
const psqlPool = new Pool({
  user: "pony",
  host: "localhost",
  database: "budget_pony_dev",
  password: "budget_pony",
  port: 5432
});

psqlPool.connect();

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

// user routes

app.post("/user", function(req, res) {
  psqlPool.query("SELECT * from test", (err, sql) => {
    res.json(sql.rows[0].message);
  });
});

app.get("/user", function(req, res) {
  psqlPool.query('SELECT * from "user"', (err, sql) => {
    res.json(serializeSqlResult("user", sql));
  });
});

app.get("/user/:userId", function(req, res) {
  psqlPool.query(
      'SELECT * from "user" WHERE id=$1',
      [req.params.userId],
      (err, sql) => {
        res.json(serializeSqlResult("user", sql));
      }
  );
});

// category routes

app.get("/category", function(req, res) {
  psqlPool.query('SELECT * from "category"', (err, sql) => {
    res.json(serializeSqlResults("category", sql));
  });
});

app.post("/category", function(req, res) {
  console.log(req);
  psqlPool.query(
      'INSERT INTO "category" (name) VALUES ($1)',
      [req.body.name],
      (err, sql) => {
        res.json("created!");
      }
  );
});

app.get("/category/:categoryId/transaction", function(req, res) {
  psqlPool.query(
      'SELECT * from "transaction" where categoryid=$1',
      [req.params.categoryId],
      (err, sql) => {
        res.json(serializeSqlResults("transaction", sql));
      }
  );
});

// transaction routes

app.delete("/transaction/:transactionId", function(req, res) {
  psqlPool.query(
      'DELETE FROM "transaction" WHERE id=$1',
      [req.params.transactionId],
      (err, sql) => {
        res.json("deleted!");
      }
  );
});