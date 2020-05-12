import serializeSqlResult from './serializer.js';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const ensureLogin = require('connect-ensure-login')
const express = require('express');
const { Pool } = require('pg');

const psqlPool = new Pool({
  user: 'pony',
  host: 'localhost',
  database: 'budget_pony_dev',
  password: 'budget_pony',
  port: 5432,
});

psqlPool.connect();

passport.use(new Strategy({ usernameField: 'email', session: true },
  function(email, password, done) {
    psqlPool.query(
      'SELECT * from "user" WHERE email=$1 and password=$2',
      [email, password],
      (err, sql) => {
        if (err) {
          return done(err);
        }
        if (!sql.rows.length) {
          return done(null, false);
        }

        return done(null, serializeSqlResult('user', sql));
      },
    );
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  psqlPool.query(
    'SELECT * from "user" WHERE id=$1',
    [id],
    (err, sql) => {
      if (err) {
        return cb(err);
      }
      cb(null, serializeSqlResult('user', sql));
    },
  );
});

var app = express();

app.use(require('body-parser').json());
app.use(require('express-session')({ secret: 'pony', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

// user routes
app.get('/user',
  ensureLogin.ensureLoggedIn(),
  function(req, res) {
    psqlPool.query('SELECT * from "user"', (err, sql) => {
      res.json(serializeSqlResult('user', sql));
    });
  }
);

app.get('/user/:userId',
  ensureLogin.ensureLoggedIn(),
  function(req, res) {
    psqlPool.query(
      'SELECT * from "user" WHERE id=$1',
      [req.params.userId],
      (err, sql) => {
        res.json(serializeSqlResult('user', sql));
      },
    );
  }
);


app.get('/graph/:userId',
  // ensureLogin.ensureLoggedIn(),
  function(req, res) {
    psqlPool.query(
      `select t.*, c.name as cName, c.budget as cBudget from "transaction" as t
      left join category as c on c.id = t.categoryId
      where c.userId = $1;`,
      [req.params.userId],
      (err, sql) => {
        res.json(sql.rows);
      },
    );
  }
);

app.post('/register',
  function(req, res) {
    psqlPool.query(
      'INSERT INTO "user" (email, password) VALUES ($1, $2)',
      [req.body.email, req.body.password],
      (err, sql) => {
        if (err) {
          return res.status(400).json(err.detail);
        }

        psqlPool.query(
          'SELECT * from "user" WHERE email=$1',
          [req.body.email],
          (err, sql) => {
            res.json(serializeSqlResult('user', sql));
          }
        )
      }
    );
  }
);

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.json("Successfully logged in");
  }
);

app.post('/logout',
  function(req, res){
    req.logout();
    res.json();
  }
);
