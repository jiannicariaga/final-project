require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');

const app = express();

app.use(staticMiddleware);

app.get('/api/search', (req, res, next) => {
  if (!req.query) {
    throw new ClientError(400, 'term and location are required fields.');
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
