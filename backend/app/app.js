import serializeSqlResult, { serializeSqlRow } from './serializer.js';
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var ensureLogin = require('connect-ensure-login')
var express = require('express');
const { Pool } = require('pg');

const psqlPool = new Pool({
  user: 'pony',
  host: 'localhost',
  database: 'budget_pony_dev',
  password: 'budget_pony',
  port: 5432,
});

psqlPool.connect();

passport.use(new Strategy({ usernameField: 'email' },
  function(email, password, cb) {
    psqlPool.query(
      'SELECT * from "user" WHERE email=$1 and password=$2',
      [email, password],
      (err, sql) => {
        if (err) {
          return cb(err);
        }
        if (!sql) {
          return cb(null, false);
        }

        return cb(null, serializeSqlRow(sql));
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
      cb(null, serializeSqlRow(user));
    },
  );
});

var app = express();

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
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

app.post('/register',
  function(req, res) {
    psqlPool.query(
      'INSERT INTO "user" (email, password) VALUES ($1, $2)',
      [req.params.email, req.params.password],
      (err, sql) => {
        if (err) {
          res.status(400).json(err);
        }

        res.json(serializeSqlResult('user', sql));
      },
    );
    res.redirect('/');
  }
);

app.post('/login',
  passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.post('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  }
);
