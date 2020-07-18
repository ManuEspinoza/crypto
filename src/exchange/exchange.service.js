const fetch = require('node-fetch');
const Currency = require('../currency/Currency');

const getPairs = async () => {
    const currencyToExchange = 'USDT';
    const currencies = await Currency.find({});
    return currencies.map(currency => {
        return { pair: `${currency.name}${currencyToExchange}`, price: currency.defaultPrice }
    });
}

const getCurrenciesIndollars = async () => {
    try {
        const response = await fetch(process.env.EXCHANGE_URL);
        const body = await response.json();
        const data = body.data;
        const currenciesPairs = await getPairs();
        data.forEach(currencyData => {
            const pos = currenciesPairs.findIndex((currency) => currency.pair === currencyData.s);
            if (pos !== -1) {
                currenciesPairs[pos].price = currencyData.c
            }
        })
        return currenciesPairs;
    } catch (e) {
        throw new Error('Unable to connect to api');
    }
}

const exchangeCrypto = (currenciesInDollars, quantity, currency) => {
    let currencyPrice;
    for (const currencyIndollar of currenciesInDollars) {
        if (currencyIndollar.pair === `${currency}USDT`) {
            currencyPrice = currencyIndollar.price;
            break;
        }
    }
    const currencyExchange = currenciesInDollars
        .filter(currencyInDollar => !(currencyInDollar.pair === `${currency}USDT`))
        .map(currencyInDollar => {
            return { pair: currencyInDollar.pair.replace('USDT', currency), price: quantity * (currencyPrice / currencyInDollar.price) };

        })
    return currencyExchange;
}

module.exports = {
    getCurrenciesIndollars,
    exchangeCrypto
}