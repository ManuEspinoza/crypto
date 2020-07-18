const Currency = require('./Currency');

const saveCurrency = async (name, defaultPrice) => {
    try {
        const currency = new Currency({ name, defaultPrice });
        await currency.save();
        return currency;
    } catch (error) {
        throw error;
    }
}

const deleteCurrency = async (name) => {
    try {
        const currency = await Currency.findOneAndDelete({ name });
        return currency;
    } catch (error) {
        throw error;
    }
}

const updateCurrency = async (currencyToUpdate, currencyData) => {
    try {
        const currency = await Currency.findOneAndUpdate({ name: currencyToUpdate }, currencyData);
        return currency;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    saveCurrency,
    deleteCurrency,
    updateCurrency
}