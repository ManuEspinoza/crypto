const exchangeService = require('./exchange.service')

const getExchange = async (req, res, next) => {
    try {
        const { currency, quantity } = req.body;
        const currenciesInDollars = await exchangeService.getCurrenciesIndollars();
        const currencyExchange = exchangeService.exchangeCrypto(currenciesInDollars, quantity, currency);
        res.send(currencyExchange);
    } catch (error) {
        next(error);
    }

}

const getCurrencies = async (req, res, next) => {
    try {
        const currenciesPairs = await exchangeService.getCurrenciesIndollars();
        res.send(currenciesPairs);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getCurrencies,
    getExchange
}