const mongoose = require('mongoose');

const creditCardSchema = new mongoose.Schema({
  cardNumber: String,
  balance: Number,
});

creditCardSchema.plugin(uniqueValidator)
const CreditCard = mongoose.model('CreditCard', creditCardSchema);
module.exports = CreditCard;