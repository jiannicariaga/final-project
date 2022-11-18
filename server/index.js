require('dotenv/config');
const pg = require('pg');
const express = require('express');
const fetch = require('node-fetch');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const TEMP_USER_ID = 1;

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const app = express();

app.use(staticMiddleware);

app.use(express.json());

app.get('/search-results', (req, res, next) => {
  if (!Object.keys(req.query).length) {
    throw new ClientError(400, 'term and location are required fields.');
  }
  const url = new URL('https://api.yelp.com/v3/businesses/search');
  req.query.categories = 'food';
  for (const key in req.query) url.searchParams.append(key, req.query[key]);
  const headers = {
    headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` }
  };
  fetch(url, headers)
    .then(response => response.json())
    .then(data => {
      const sql = `
        SELECT "restaurantId"
          FROM "roulette"
          WHERE "accountId" = $1
      `;
      const params = [TEMP_USER_ID];
      db.query(sql, params)
        .then(result => {
          const restaurantIds = result.rows.map(result => result.restaurantId);
          data.inRoulette = restaurantIds;
          res.status(200).json(data);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.get('/detail', (req, res, next) => {
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
      const sql = `
        SELECT "restaurantId"
          FROM "roulette"
          WHERE "accountId" = $1
      `;
      const params = [TEMP_USER_ID];
      db.query(sql, params)
        .then(result => {
          const restaurantIds = result.rows.map(result => result.restaurantId);
          data.inRoulette = restaurantIds;
          res.status(200).json(data);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.get('/roulette', (req, res, next) => {
  const sql = `
    SELECT "details"
      FROM "restaurants"
      JOIN "roulette" using ("restaurantId")
      WHERE "roulette"."accountId" = $1
  `;
  const params = [TEMP_USER_ID];
  db.query(sql, params)
    .then(result => {
      const restaurantDetails = result.rows.map(result => result.details);
      res.status(200).json(restaurantDetails);
    })
    .catch(err => next(err));
});

app.put('/roulette', (req, res, next) => {
  const { id: restaurantId } = req.body;
  if (!req.body) throw new ClientError(400, 'id is a required field.');
  const sql1 = `
    INSERT INTO "restaurants" ("restaurantId", "details")
      VALUES ($1, $2)
      ON CONFLICT ("restaurantId") DO UPDATE
      SET "details" = $2
      RETURNING *
  `;
  const params1 = [restaurantId, req.body];
  db.query(sql1, params1)
    .then(result => {
      const sql2 = `
        INSERT INTO "roulette" ("restaurantId", "accountId")
          VALUES ($1, $2)
          ON CONFLICT ("restaurantId", "accountId") DO NOTHING
      `;
      const params2 = [restaurantId, TEMP_USER_ID];
      db.query(sql2, params2)
        .then(res.status(201).json(result.rows[0]))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.delete('/roulette/:id', (req, res, next) => {
  const { id: restaurantId } = req.params;
  if (!req.params) throw new ClientError(400, 'id is a required field.');
  const sql1 = `
    DELETE FROM "roulette"
      WHERE "restaurantId" = $1
      AND "accountId" = $2
      RETURNING *
  `;
  const params1 = [restaurantId, TEMP_USER_ID];
  db.query(sql1, params1)
    .then(result => {
      const sql2 = `
        SELECT "restaurantId"
          FROM "roulette"
          WHERE "accountId" = $1
      `;
      const params2 = [TEMP_USER_ID];
      db.query(sql2, params2)
        .then(result => {
          const restaurantIds = result.rows.map(result => result.restaurantId);
          res.status(200).json(restaurantIds);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.put('/favorites', (req, res, next) => {
  const { id: restaurantId } = req.body;
  if (!req.body) throw new ClientError(400, 'id is a required field.');
  const sql1 = `
    INSERT INTO "restaurants" ("restaurantId", "details")
      VALUES ($1, $2)
      ON CONFLICT ("restaurantId") DO UPDATE
      SET "details" = $2
      RETURNING *
  `;
  const params1 = [restaurantId, req.body];
  db.query(sql1, params1)
    .then(result => {
      const sql2 = `
        INSERT INTO "favorites" ("restaurantId", "accountId")
          VALUES ($1, $2)
          ON CONFLICT ("restaurantId", "accountId") DO NOTHING
      `;
      const params2 = [restaurantId, TEMP_USER_ID];
      db.query(sql2, params2)
        .then(res.status(201).json(result.rows[0]))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.delete('/favorites/:id', (req, res, next) => {
  const { id: restaurantId } = req.params;
  if (!req.params) throw new ClientError(400, 'id is a required field.');
  const sql1 = `
    DELETE FROM "favorites"
      WHERE "restaurantId" = $1
      AND "accountId" = $2
      RETURNING *
  `;
  const params1 = [restaurantId, TEMP_USER_ID];
  db.query(sql1, params1)
    .then(result => {
      const sql2 = `
        SELECT "restaurantId"
          FROM "favorites"
          WHERE "accountId" = $1
      `;
      const params2 = [TEMP_USER_ID];
      db.query(sql2, params2)
        .then(result => {
          const restaurantIds = result.rows.map(result => result.restaurantId);
          res.status(200).json(restaurantIds);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\nApp listening on port ${process.env.PORT}.\n\n`);
});
