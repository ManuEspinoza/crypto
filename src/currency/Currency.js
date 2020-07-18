const { Schema, model } = require('mongoose');
const AppError = require('../error/AppError');
const CurrencySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    defaultPrice: {
        type: Number,
        required: true
    }
})

CurrencySchema.post('save', (err, res, next) => {
    if (err.name === 'MongoError' && err.code === 11000) {
        return next(new AppError('There is already a currency with that name', 400));
    }
    next();
})


const Currency = model('currency', CurrencySchema);

module.exports = Currency;