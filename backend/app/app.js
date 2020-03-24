import serializeSqlResult from './serializer.js';

var express = require('express');
var app = express();

const {Pool} = require('pg');
const psqlPool = new Pool({
  user: 'pony',
  host: 'localhost',
  database: 'budget_pony_dev',
  password: 'budget_pony',
  port: 5432,
});

psqlPool.connect();

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

// user routes

app.post('/user', function(req, res) {
  psqlPool.query('SELECT * from test', (err, sql) => {
    res.json(sql.rows[0].message);
  });
});

app.get('/user', function(req, res) {
  psqlPool.query('SELECT * from "user"', (err, sql) => {
    res.json(serializeSqlResult('user', sql));
  });
});

app.get('/user/:userId', function(req, res) {
  psqlPool.query(
    'SELECT * from "user" WHERE id=$1',
    [req.params.userId],
    (err, sql) => {
      res.json(serializeSqlResult('user', sql));
    },
  );
});
