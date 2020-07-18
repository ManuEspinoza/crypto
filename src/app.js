require('dotenv').config();
const express = require('express');
const app = express();
const exchangeRouter = require('./exchange/exchange.routes');
const currencyRouter = require('./currency/currency.routes');
const { logError, handleError, serverError } = require('./helpers/errorhandlers');

app.use(express.json());
app.use(exchangeRouter);
app.use(currencyRouter);

app.use(logError);
app.use(handleError);
app.use(serverError);

module.exports = app;