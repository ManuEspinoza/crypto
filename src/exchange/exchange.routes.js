const { Router } = require('express');
const router = Router();
const ExchangeController = require('./exchange.controller')

router.get('/currencies', ExchangeController.getCurrencies);
router.get('/exchange', ExchangeController.getExchange);

module.exports = router;