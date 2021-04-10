const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

const HttpError = require('./models/http-error');
const productRoutes = require('./routes/products');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'welcome to smart shopper' });
});

app.use('/products', productRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find the route', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An uknown error occured' });
});

const PORT = 5000;

app.listen(PORT, (req, res) => console.log(`Server started on ${PORT}...`));
