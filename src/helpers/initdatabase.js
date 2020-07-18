
const Currency = require('../currency/Currency');
const fs = require('fs');

const initDatabase = async () => {
    const currencies = await Currency.find({});
    if (currencies.length !== 0) {
        return;
    }
    const dataBuffer = fs.readFileSync('currencies.json');
    const data = dataBuffer.toString();
    const firstCurrencies = JSON.parse(data);
    await Currency.insertMany(firstCurrencies);
}

module.exports = initDatabase;