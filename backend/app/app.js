import { serializeSqlResults, serializeSqlResult } from "./serializer.js";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const ensureLogin = require("connect-ensure-login");
const express = require("express");
const { Pool } = require("pg");
const cookieSession = require("cookie-session");

const psqlPool = new Pool({
  user: "pony",
  host: "localhost",
  database: "budget_pony_dev",
  password: "budget_pony",
  port: 5432
});

psqlPool.connect();

passport.use(
  new Strategy({ usernameField: "email", session: true }, function(
    email,
    password,
    done
  ) {
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

        return done(null, serializeSqlResult("user", sql));
      }
    );
  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  psqlPool.query('SELECT * from "user" WHERE id=$1', [id], (err, sql) => {
    if (err) {
      return cb(err);
    }
    cb(null, serializeSqlResult("user", sql));
  });
});

var app = express();

app.use(require("body-parser").json());
app.use(
  cookieSession({
    name: "session",
    keys: ["pony"],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

// user routes
app.get("/user", ensureLogin.ensureLoggedIn(), function(req, res) {
  psqlPool.query(
    'SELECT * from "user" WHERE id=$1',
    [req.user.id],
    (err, sql) => {
      res.json(serializeSqlResult("user", sql));
    }
  );
});

app.put('/user', ensureLogin.ensureLoggedIn(), function(req, res) {
        psqlPool.query('UPDATE "user" SET salaryday = $1 WHERE id = $2',
            [req.body.salaryday, req.user.id], () => {
                res.json("updated salary day");
            });
    }
);

app.post("/register", function(req, res) {
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
          res.json(serializeSqlResult("user", sql));
        }
      );
    }
  );
});

app.post("/login", passport.authenticate("local"), function(req, res) {
  res.json("Successfully logged in");
});

app.post("/logout", function(req, res) {
  req.logout();
  res.json();
});

// category routes

app.get("/category", ensureLogin.ensureLoggedIn(), function(req, res) {
  psqlPool.query('SELECT * from "category" WHERE userid = $1',
      [req.user.id],
      (err, sql) => {
    res.json(serializeSqlResults("category", sql));
  });
});

app.post("/category", ensureLogin.ensureLoggedIn(), function(req, res) {
  psqlPool.query(
    'INSERT INTO "category" (name, userId) VALUES ($1, $2)',
    [req.body.name, req.user.id],
    (err, sql) => {
      res.json("created!");
    }
  );
});

app.put("/categories", function(req, res) {
    req.body.forEach( category => {
            psqlPool.query(
                'UPDATE "category" SET budget = $1 WHERE id = $2',
                [category.budget, category.id], () => {})
        }
    )
});

// transaction routes

app.get(
  "/category/:categoryId/transaction",
  ensureLogin.ensureLoggedIn(),
  function(req, res) {
    psqlPool.query(
      'SELECT * from "transaction" where categoryid=$1',
      [req.params.categoryId],
      (err, sql) => {
        if (!sql) {
          return res.json("");
        }
        res.json(serializeSqlResults("transaction", sql));
      }
    );
  }
);

/* Get data for graphs */
app.get('/graph',
  function(req, res) {
    psqlPool.query(
      `select t.*, c.name as cName, c.budget as cBudget from "transaction" as t
      left join category as c on c.id = t.categoryId
      where c.userId = $1;`,
      [req.user.id],
      (err, sql) => {
        res.json(sql.rows);
      },
    );
  }
);

app.post(
  "/category/:categoryId/transaction",
  ensureLogin.ensureLoggedIn(),
  function(req, res) {
    psqlPool.query(
      'INSERT INTO "transaction" (description, amount, createdAt, categoryId) VALUES ($1, $2, $3, $4)',
      [
        req.body.description,
        req.body.amount,
        req.body.createdAt,
        req.params.categoryId
      ],
      (err, sql) => {
        if (!sql) {
          return res.json("");
        }
        res.json(serializeSqlResults("transaction", sql));
      }
    );
  }
);

app.delete(
  "/transaction/:transactionId",
  ensureLogin.ensureLoggedIn(),
  function(req, res) {
    psqlPool.query(
      'DELETE FROM "transaction" WHERE id=$1',
      [req.params.transactionId],
      (err, sql) => {
        res.json("deleted!");
      }
    );
  }
);