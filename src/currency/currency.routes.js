const { Router } = require('express');
const router = Router();
const CurrencyController = require('./currency.controller');

router.post('/currency', CurrencyController.postCurrency);
router.delete('/currency/:name', CurrencyController.deleteCurrency);
router.patch('/currency/:name', CurrencyController.updateCurrency);

module.exports = router;