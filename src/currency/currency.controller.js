const AppError = require('../error/AppError');
const currencyService = require('./currency.service');

const postCurrency = async (req, res, next) => {
    try {
        const { name, defaultPrice } = req.body;
        if (!name || defaultPrice === undefined) {
            throw new AppError('All fields are required', 400);
        }
        const currency = await currencyService.saveCurrency(name, defaultPrice);
        res.status(201).send(currency);
    } catch (error) {
        next(error);
    }
}

const deleteCurrency = async (req, res, next) => {
    try {
        const name = req.params.name;
        const currency = await currencyService.deleteCurrency(name);
        if (!currency) {
            throw new AppError('Currency not found', 404);
        }
        res.send(currency);
    } catch (error) {
        next(error);
    }
}

const updateCurrency = async (req, res, next) => {
    try {
        const currencyToUpdate = req.params.name;
        const { name, defaultPrice } = req.body;
        if (!name || defaultPrice === undefined) {
            throw new AppError('All fields are required', 400);
        }
        const currency = await currencyService.updateCurrency(currencyToUpdate, { name, defaultPrice });
        if (!currency) {
            throw new AppError('Currency not found', 404);
        }
        res.send(currency);
    } catch (error) {
        next(error);
    }

}

module.exports = {
    postCurrency,
    deleteCurrency,
    updateCurrency
}