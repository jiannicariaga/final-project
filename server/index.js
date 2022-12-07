require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const staticMiddleware = require('./static-middleware');
const jsonMiddleware = express.json();
const authorizationMiddleware = require('./authorization-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const app = express();

app.use(staticMiddleware);

app.use(jsonMiddleware);

app.use((req, res) => {
  const { url } = req;
  res.redirect(`/#${url.slice(1)}`);
});

app.post('/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields.');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        INSERT INTO "accounts" ("username", "hashedPassword")
        VALUES ($1, $2)
        RETURNING "accountId", "username"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => next(err));
});

app.post('/log-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields.');
  }
  const sql = `
    SELECT "accountId", "hashedPassword"
      FROM "accounts"
     WHERE "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) throw new ClientError(401, 'invalid login.');
      const { accountId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) throw new ClientError(401, 'invalid login.');
          const payload = { accountId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.get('/search', (req, res, next) => {
  const { accountId } = req.user;
  if (!Object.keys(req.query).length) {
    throw new ClientError(400, 'term and location are required fields.');
  }
  const url = new URL('https://api.yelp.com/v3/businesses/search');
  req.query.categories = 'food,restaurants';
  for (const key in req.query) url.searchParams.append(key, req.query[key]);
  const headers = {
    headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` }
  };
  fetch(url, headers)
    .then(response => response.json())
    .then(data => {
      const sql1 = `
        SELECT "restaurantId"
          FROM "roulette"
          WHERE "accountId" = $1
      `;
      const params1 = [accountId];
      db.query(sql1, params1)
        .then(result => {
          const rouletteIds = result.rows.map(row => row.restaurantId);
          data.inRoulette = rouletteIds;
          const sql2 = `
            SELECT "restaurantId"
              FROM "favorites"
              WHERE "accountId" = $1
          `;
          const params2 = [accountId];
          db.query(sql2, params2)
            .then(result => {
              const favoritesIds = result.rows.map(row => row.restaurantId);
              data.inFavorites = favoritesIds;
              res.status(200).json(data);
            })
            .catch(err => next(err));
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.get('/detail', (req, res, next) => {
  const { accountId } = req.user;
  if (!Object.keys(req.query).length) {
    throw new ClientError(400, 'id is a required field.');
  }
  const url = new URL(`https://api.yelp.com/v3/businesses/${req.query.id}`);
  const headers = {
    headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` }
  };
  fetch(url, headers)
    .then(response => response.json())
    .then(data => {
      const sql1 = `
        SELECT "restaurantId"
          FROM "roulette"
          WHERE "accountId" = $1
      `;
      const params1 = [accountId];
      db.query(sql1, params1)
        .then(result => {
          const rouletteIds = result.rows.map(row => row.restaurantId);
          data.inRoulette = rouletteIds;
          const sql2 = `
            SELECT "restaurantId"
              FROM "favorites"
              WHERE "accountId" = $1
          `;
          const params2 = [accountId];
          db.query(sql2, params2)
            .then(result => {
              const favoritesIds = result.rows.map(row => row.restaurantId);
              data.inFavorites = favoritesIds;
              res.status(200).json(data);
            })
            .catch(err => next(err));
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.get('/roulette', (req, res, next) => {
  const { accountId } = req.user;
  const sql1 = `
    SELECT "details"
      FROM "restaurants"
      JOIN "roulette" using ("restaurantId")
      WHERE "roulette"."accountId" = $1
  `;
  const params1 = [accountId];
  db.query(sql1, params1)
    .then(result => {
      const inRoulette = result.rows.map(row => row.details);
      const sql2 = `
        SELECT "restaurantId"
          FROM "favorites"
          WHERE "accountId" = $1
      `;
      const params2 = [accountId];
      db.query(sql2, params2)
        .then(result => {
          const inFavorites = result.rows.map(row => row.restaurantId);
          res.status(200).json({ inRoulette, inFavorites });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.get('/favorites', (req, res, next) => {
  const { accountId } = req.user;
  const sql1 = `
    SELECT "details"
      FROM "restaurants"
      JOIN "favorites" using ("restaurantId")
      WHERE "favorites"."accountId" = $1
  `;
  const params1 = [accountId];
  db.query(sql1, params1)
    .then(result => {
      const inFavorites = result.rows.map(row => row.details);
      const sql2 = `
        SELECT "restaurantId"
          FROM "roulette"
          WHERE "accountId" = $1
      `;
      const params2 = [accountId];
      db.query(sql2, params2)
        .then(result => {
          const inRoulette = result.rows.map(row => row.restaurantId);
          res.status(200).json({ inFavorites, inRoulette });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.put('/roulette', (req, res, next) => {
  if (!req.body) throw new ClientError(400, 'id is a required field.');
  const sql1 = `
    INSERT INTO "restaurants" ("restaurantId", "details")
      VALUES ($1, $2)
      ON CONFLICT ("restaurantId") DO UPDATE
      SET "details" = $2
      RETURNING *
  `;
  const params1 = [req.body.id, req.body];
  db.query(sql1, params1)
    .then(result => {
      const { accountId } = req.user;
      const sql2 = `
        INSERT INTO "roulette" ("restaurantId", "accountId")
          VALUES ($1, $2)
          ON CONFLICT ("restaurantId", "accountId") DO NOTHING
      `;
      const params2 = [req.body.id, accountId];
      db.query(sql2, params2)
        .then(res.status(201).json(result.rows[0]))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.put('/favorites', (req, res, next) => {
  if (!req.body) throw new ClientError(400, 'id is a required field.');
  const sql1 = `
    INSERT INTO "restaurants" ("restaurantId", "details")
      VALUES ($1, $2)
      ON CONFLICT ("restaurantId") DO UPDATE
      SET "details" = $2
      RETURNING *
  `;
  const params1 = [req.body.id, req.body];
  db.query(sql1, params1)
    .then(result => {
      const { accountId } = req.user;
      const sql2 = `
        INSERT INTO "favorites" ("restaurantId", "accountId")
          VALUES ($1, $2)
          ON CONFLICT ("restaurantId", "accountId") DO NOTHING
      `;
      const params2 = [req.body.id, accountId];
      db.query(sql2, params2)
        .then(res.status(201).json(result.rows[0]))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.delete('/roulette/:id', (req, res, next) => {
  const { accountId } = req.user;
  const sql = `
    DELETE FROM "roulette"
      WHERE "restaurantId" = $1
      AND "accountId" = $2
      RETURNING *
  `;
  const params = [req.params.id, accountId];
  db.query(sql, params)
    .then(result => res.status(200).json(result.rows[0].restaurantId))
    .catch(err => next(err));
});

app.delete('/favorites/:id', (req, res, next) => {
  const { accountId } = req.user;
  const sql = `
    DELETE FROM "favorites"
      WHERE "restaurantId" = $1
      AND "accountId" = $2
      RETURNING *
  `;
  const params = [req.params.id, accountId];
  db.query(sql, params)
    .then(result => res.status(200).json(result.rows[0].restaurantId))
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\nApp listening on port ${process.env.PORT}.\n\n`);
});
